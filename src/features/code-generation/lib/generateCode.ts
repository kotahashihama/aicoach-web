import { Language } from '../../../shared/types'
import { assertAPIKey, createAPIError } from '../../../shared/lib/errorHandling'
import { getLanguageDisplayName } from '../../../shared/lib/language'
import { API_CONFIG, ERROR_MESSAGES } from '../../../shared/constants'

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

/**
 * AI を使用してコードを生成または変更します
 * @param prompt - 生成・変更するコードの説明
 * @param language - プログラミング言語
 * @param apiKey - OpenAI API キー
 * @param existingCode - 既存のコード（空の場合は新規生成）
 * @returns 生成・変更されたコード
 * @throws {Error} API エラーの場合
 */
export const generateCode = async (
  prompt: string,
  language: Language,
  apiKey: string,
  existingCode?: string,
): Promise<string> => {
  assertAPIKey(apiKey)

  const langName = getLanguageDisplayName(language)
  const hasExistingCode = existingCode && existingCode.trim().length > 0
  
  const systemPrompt = hasExistingCode
    ? `あなたは${langName}のコード変更・改善アシスタントです。
既存のコードを起点として、ユーザーの要求に基づいて変更・改善・機能追加を行ってください。
完全に新しいコードで置き換えるのではなく、既存のコードを活かしながら変更してください。

重要な指示:
1. 変更されたコード全体を返してください。説明や追加のテキストは不要です。
2. 既存のコードの良い部分は残しつつ、要求された変更を加えてください。
3. 適切なエラーハンドリングを含めてください。
4. 必要に応じてコメントを追加してください。
5. ${langName}の慣習に従ったコーディングスタイルを使用してください。
6. 既存の変数名や関数名、構造をできるだけ維持してください。
7. コメントでは日本語と英語の間に半角スペースを入れてください（例：「JavaScript のコード」「API の使用」）。`
    : `あなたは${langName}のコード生成アシスタントです。
ユーザーの要求に基づいて、クリーンで読みやすく、ベストプラクティスに従った${langName}コードを生成してください。

重要な指示:
1. コードのみを返してください。説明や追加のテキストは不要です。
2. 適切なエラーハンドリングを含めてください。
3. 必要に応じてコメントを追加してください。
4. ${langName}の慣習に従ったコーディングスタイルを使用してください。
5. コメントでは日本語と英語の間に半角スペースを入れてください（例：「JavaScript のコード」「API の使用」）。`

  const userPrompt = hasExistingCode
    ? `現在の${langName}コード:
\`\`\`${language}
${existingCode}
\`\`\`

以下の要求に基づいて上記のコードを変更・改善してください：
${prompt}

変更されたコード全体を返してください。`
    : `以下の要求に基づいて${langName}コードを生成してください：

${prompt}

コードのみを返してください。`

  try {
    const response = await fetch(API_CONFIG.OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw createAPIError(response.status, errorText)
    }

    const data = (await response.json()) as OpenAIResponse
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('生成されたコードが空です')
    }

    // コードブロックの除去（```で囲まれている場合）
    const cleanedCode = content
      .replace(/^```[a-zA-Z]*\n/, '')
      .replace(/\n```$/, '')
      .trim()

    return cleanedCode
  } catch (error) {
    console.error('Code generation error:', error)
    throw new Error(
      `コード生成エラー: ${error instanceof Error ? error.message : ERROR_MESSAGES.API_ERROR}`,
    )
  }
}