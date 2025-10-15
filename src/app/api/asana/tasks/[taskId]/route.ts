import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ASANA_ENDPOINTS } from '@/lib/constants';

interface Params {
  taskId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const token = process.env.ASANA_TOKEN;
    if (!token) return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 400 });

    const { taskId } = params;
    if (!taskId) return NextResponse.json({ error: "taskId が指定されていません" }, { status: 400 });

    try {
        // タスク詳細取得
        const taskRes = await axios.get(
            `${ASANA_ENDPOINTS.TASKS.DETAIL(taskId)}?opt_fields=name,notes,assignee,due_on,custom_fields,permalink_url`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        const task = taskRes.data.data;

        // カスタムフィールドを取得
        const customFields = task.custom_fields || [];

        const directorField = customFields.find((f: any) => f.name === "ディレクター");
        const statusField = customFields.find((f: any) => f.name === "ステータス");
        const idField = customFields.find((f: any) => f.name === "ID");

        return NextResponse.json({
            success: true,
            id: task.gid,
            name: task.name,
            description: task.notes,
            due_on: task.due_on,
            assignee: task.assignee?.name || null,
            custom_fields: {
                director: directorField?.text_value || null,
                status: statusField?.enum_value?.name || statusField?.text_value || null,
                id: idField?.text_value || null,
            },
        });
    } catch (error: any) {
        console.error("Asana API Error:", error.response?.data || error.message);
        return NextResponse.json(
            { success: false, error: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }
}
