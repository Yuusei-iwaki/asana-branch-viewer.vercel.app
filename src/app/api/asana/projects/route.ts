import { NextResponse } from 'next/server';
import axios from 'axios';
import { ASANA_ENDPOINTS } from '@/lib/constants';

export async function GET() {
    const token = process.env.ASANA_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 400 });
    }

     try {
        const response = await axios.get(ASANA_ENDPOINTS.PROJECTS.LIST,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json({
            success: true,
            total: response.data.data.length,
            projects: response.data.data,
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