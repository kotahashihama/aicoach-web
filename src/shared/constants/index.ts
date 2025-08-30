/**
 * API関連の定数
 */
export const API_CONFIG = {
  MODEL: 'gpt-4o',
  MAX_TOKENS: 1500,
  TEMPERATURE: 0.3,
  OPENAI_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
} as const

/**
 * ローカルストレージのキー
 */
export const STORAGE_KEYS = {
  API_KEY: 'openai_api_key',
} as const

/**
 * コード処理の制限
 */
export const CODE_LIMITS = {
  MAX_LINES: 200,
  MAX_BYTES: 10240,
} as const

/**
 * プロンプトのシステムメッセージ
 */
export const SYSTEM_PROMPTS = {
  CODE_REVIEW: `あなたはコードレビューの専門家です。以下のルールに従って回答してください：

1. 構文エラーがある場合は、具体的なエラー内容、問題箇所、修正方法を説明する
2. 実際のコードが提供された場合のみ、詳細な解説を行う
3. コードの断片でも、文法的に意味がある場合は解説する
4. 回答はMarkdown形式で記述する
5. 構文エラーの説明は、初心者にも理解しやすいように具体的に行う`,
} as const

/**
 * エラーメッセージ
 */
export const ERROR_MESSAGES = {
  NO_CODE: 'コードを入力してください',
  NO_DIFF_CODE: '前後のコードが必要です',
  NO_API_KEY:
    'OpenAI APIキーが設定されていません。右上の入力欄にAPIキーを入力してください',
  API_ERROR: 'エラーが発生しました',
  STREAM_ERROR: 'レスポンスの読み取りに失敗しました',
} as const
