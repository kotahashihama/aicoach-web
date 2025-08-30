import { z } from 'zod'
import { Language } from '../../../shared/types'
import { assertAPIKey, createAPIError } from '../../../shared/lib/errorHandling'
import { getLanguageDisplayName } from '../../../shared/lib/language'
import { API_CONFIG, ERROR_MESSAGES } from '../../../shared/constants'

// Zod スキーマの定義
const CodeGenerationResponse = z.object({
  isValidRequest: z.boolean(),
  code: z.string(),
  reason: z.string().optional(),
})

type CodeGenerationResponse = z.infer<typeof CodeGenerationResponse>

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
): Promise<{ code: string; isValidRequest: boolean; reason?: string }> => {
  assertAPIKey(apiKey)

  const langName = getLanguageDisplayName(language)
  const hasExistingCode = existingCode && existingCode.trim().length > 0

  const systemPrompt = `あなたは${langName}のコード生成・変更アシスタントです。
ユーザーの要求を分析し、適切なコード生成・変更の指示かどうかを判断してください。

判断基準：
- 適切：コード作成、機能追加、バグ修正、リファクタリング、学習用サンプル、コード例の要求など、コードに関連する全ての指示
- 不適切：挨拶、単なる質問（コード生成を伴わない）、感想など

${hasExistingCode ? '既存のコードを起点として変更してください。' : '新規コードを生成してください。'}

コード作成時の注意：
- ${langName}の慣習に従ったコーディングスタイル
- 適切なエラーハンドリング
- 日本語と英語の間に半角スペース
- 学習用コードの場合は、理解しやすいコメントを追加
- 生成結果はコードのみとし、説明文や前置きは含めない`

  const userPrompt = hasExistingCode
    ? `現在の${langName}コード:
\`\`\`${language}
${existingCode}
\`\`\`

ユーザーの要求：
${prompt}

${hasExistingCode ? existingCode : ''}`
    : `ユーザーの要求：
${prompt}`

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
        functions: [
          {
            name: 'generateCode',
            description: 'コード生成・変更の結果を返す',
            parameters: {
              type: 'object',
              properties: {
                isValidRequest: {
                  type: 'boolean',
                  description:
                    'ユーザーの要求がコード生成・変更に関連する指示かどうか',
                },
                code: {
                  type: 'string',
                  description:
                    '生成または変更されたコードのみ（説明文やマークダウンは含めない）',
                },
                reason: {
                  type: 'string',
                  description: '無効なリクエストの理由',
                },
              },
              required: ['isValidRequest', 'code'],
            },
          },
        ],
        function_call: { name: 'generateCode' },
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw createAPIError(response.status, errorText)
    }

    const data = await response.json()
    const functionCall = data.choices[0]?.message?.function_call

    if (!functionCall || !functionCall.arguments) {
      throw new Error('関数呼び出しが見つかりません')
    }

    try {
      const args = JSON.parse(functionCall.arguments)
      const validated = CodeGenerationResponse.parse(args)
      return validated
    } catch (parseError) {
      console.error('Function arguments parsing error:', parseError)
      console.error('Arguments:', functionCall.arguments)

      // パースエラーの場合は不適切な要求として扱う
      return {
        code: hasExistingCode ? existingCode || '' : '',
        isValidRequest: false,
        reason: 'AI の応答を解析できませんでした',
      }
    }
  } catch (error) {
    console.error('Code generation error:', error)
    throw new Error(
      `コード生成エラー: ${error instanceof Error ? error.message : ERROR_MESSAGES.API_ERROR}`,
    )
  }
}
