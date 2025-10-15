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

/** 管理対象のAsanaプロジェクトID一覧 */
export const ASANA_PROJECT_IDS = [
    "1206541737566125", // 真木
    "1206968322545456", // ホロスコ
    "1208204035488853", // 水晶
    "1209494064689151", // みみこ
    "1210376026342155", // ほしよみ
    "1211421462068712", // 新宿
    "1211425444728434", // ベル水晶
    "1205168511054247", // キャリア優先
    "1205177861080627", // SEO優先
    "1205168460885189", // デバッグ
];

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

/**
 * =====================================
 * 🧭 GitHub API 定数
 * =====================================
 * 認証ユーザーのリポジトリ・ブランチ・コミット関連のエンドポイント
 */

export const GITHUB_BASE_URL = "https://api.github.com";

/** 環境変数からGitHubのオーナー名を取得（必要に応じて使用） */
export const GITHUB_OWNER = process.env.GITHUB_OWNER || "";

/** GitHub APIエンドポイント */
export const GITHUB_ENDPOINTS = {
    /** 🔹 リポジトリ関連 */
    REPOS: {
        /** 認証済みユーザーのリポジトリ一覧（所有 or コラボしているもの、プライベート含む） */
        LIST: `${GITHUB_BASE_URL}/user/repos`,

        /** 特定リポジトリの詳細取得 */
        DETAIL: (repoName: string) => `${GITHUB_BASE_URL}/repos/${GITHUB_OWNER}/${repoName}`,
    },

    /** 🔹 ブランチ関連 */
    BRANCHES: {
        /** 特定リポジトリのブランチ一覧取得 */
        LIST: (repoName: string) => `${GITHUB_BASE_URL}/repos/${GITHUB_OWNER}/${repoName}/branches`,
    },

    /** 🔹 コミット関連 */
    COMMITS: {
        /** 特定リポジトリのコミット一覧取得 */
        LIST: (repoName: string) => `${GITHUB_BASE_URL}/repos/${GITHUB_OWNER}/${repoName}/commits`,

        /** 特定コミットの詳細取得 */
        DETAIL: (repoName: string, sha: string) => `${GITHUB_BASE_URL}/repos/${GITHUB_OWNER}/${repoName}/commits/${sha}`,
    },
};


