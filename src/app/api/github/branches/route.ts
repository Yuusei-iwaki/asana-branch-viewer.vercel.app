import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { GITHUB_ENDPOINTS, GITHUB_BASE_URL } from '@/lib/constants';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const perPage = 100;
    const maxPages = 10;

    if (!token) {
        return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 400 });
    }

     try {
        const allBranches: any[] = [];
        
        for (let page = 1; page <= maxPages; page++) {
            const response = await axios.get(
                `${GITHUB_ENDPOINTS.BRANCHES.LIST("capo_java_mimiko_front")}?per_page=${perPage}&page=${page}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = response.data;
            if (data.length === 0) break; // データがなければ終了
            allBranches.push(...data);

            if (data.length < perPage) break; // 最後のページなら終了
        }

        // 必要な情報だけ抽出
        const branches = allBranches.map((branch: any) => (branch.name));

        return NextResponse.json({ success: true, total: branches.length, branches });
    } catch (error: any) {
        console.error("Asana API Error:", error.response?.data || error.message);
        return NextResponse.json(
            {
                success: false,
                error: error.response?.data || error.message,
            },
            { status: error.response?.status || 500 }
        );
    }
}