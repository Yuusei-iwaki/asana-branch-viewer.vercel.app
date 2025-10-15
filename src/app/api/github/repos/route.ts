import { NextResponse } from 'next/server';
import axios from 'axios';
import { GITHUB_ENDPOINTS } from '@/lib/constants';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 400 });
    }

     try {
        const response = await axios.get(GITHUB_ENDPOINTS.REPOS.LIST,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json({
            success: true,
            total: response.data.length,
            repos: response.data.map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                private: repo.private,
                html_url: repo.html_url,
                owner: repo.owner?.login,
            })),
        });
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