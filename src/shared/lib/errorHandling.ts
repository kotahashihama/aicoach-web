import { ERROR_MESSAGES } from '../constants'

/**
 * APIエラーを表現するカスタムエラークラス
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * エラーをユーザー向けメッセージに変換します
 * @param error - 変換するエラー
 * @returns ユーザー向けエラーメッセージ
 */
export const handleAPIError = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return ERROR_MESSAGES.API_ERROR
}

/**
 * APIエラーを作成します
 * @param statusCode - HTTPステータスコード
 * @param responseText - レスポンステキスト
 * @returns APIエラーオブジェクト
 */
export const createAPIError = (
  statusCode: number,
  responseText: string,
): APIError => {
  const message = `OpenAI API error: ${statusCode} - ${responseText}`
  return new APIError(message, statusCode, responseText)
}

/**
 * APIキーが存在することをアサートします
 * @param apiKey - チェックするAPIキー
 * @throws {Error} APIキーが存在しない場合
 */
export function assertAPIKey(
  apiKey: string | undefined,
): asserts apiKey is string {
  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.NO_API_KEY)
  }
}
