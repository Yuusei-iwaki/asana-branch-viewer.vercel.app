/**
 * =====================================
 * 🧭 Asana API 定数
 * =====================================
 * Asana APIのベースURLと、主要エンドポイントを定義。
 * 各モジュールでURLを直接書かないようにし、保守性を向上させる。
 */

/** Asana APIのベースURL */
export const ASANA_BASE_URL = "https://app.asana.com/api/1.0";

/** 環境変数から固定ワークスペースIDを取得 */
export const ASANA_WORKSPACE_ID = process.env.ASANA_WORKSPACE_ID || "";

export const ASANA_ENDPOINTS = {
    /** 🔹 プロジェクト関連 */
    PROJECTS: {
        /** ワークスペース内のプロジェクト一覧取得 */
        LIST: `${ASANA_BASE_URL}/workspaces/${ASANA_WORKSPACE_ID}/projects`,
        /** 特定プロジェクトの詳細取得 */
        DETAIL: (projectId: string) => `${ASANA_BASE_URL}/projects/${projectId}`,
    },
    /** 🔹 タスク関連 */
    TASKS: {
        /** 特定プロジェクト内のタスク一覧取得 */
        LIST: (projectId: string) => `${ASANA_BASE_URL}/projects/${projectId}/tasks`,
        /** 特定タスクの詳細取得 */
        DETAIL: (taskId: string) => `${ASANA_BASE_URL}/tasks/${taskId}`,
    },
};