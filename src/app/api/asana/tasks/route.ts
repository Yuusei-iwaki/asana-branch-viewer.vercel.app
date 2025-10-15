import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ASANA_ENDPOINTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
    const token = process.env.ASANA_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 400 });
    }

    // クエリパラメータから projectId を取得
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
        return NextResponse.json({ error: "projectId が指定されていません" }, { status: 400 });
    }

    try {
        // タスク一覧取得時に custom_fields も取得
        const response = await axios.get(
            `${ASANA_ENDPOINTS.TASKS.LIST(projectId)}?opt_fields=name,custom_fields,assignee,due_on,permalink_url`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // 必要な情報だけ整形
        const tasks = response.data.data.map((task: any) => {
            // カスタムフィールドのID項目を取得
            const idField = task.custom_fields.find((f: any) => f.name === "ID");
            return {
                gid: task.gid,
                name: task.name,
                id: idField?.text_value || null, // IDフィールドの値
                assignee: task.assignee?.name || null,
                due_on: task.due_on,
                permalink_url: task.permalink_url,
            };
        });

        return NextResponse.json({
            success: true,
            total: tasks.length,
            tasks,
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