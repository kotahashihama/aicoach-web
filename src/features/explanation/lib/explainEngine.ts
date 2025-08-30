import { ExplainLevel, Explanation } from '../../../shared/types'
import { maskSensitiveData, truncateCode } from '../../../shared/lib/mask'
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
 * コードを解析して解説を生成します
 * @param code - 解説するコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @param apiKey - OpenAI APIキー
 * @returns 解説オブジェクト
 * @throws {Error} APIエラーまたはパースエラーの場合
 */
export const explainHeuristically = async (
  code: string,
  lang: string,
  level: ExplainLevel,
  apiKey: string,
): Promise<Explanation> => {
  assertAPIKey(apiKey)

  // コードのマスキングと切り詰め
  const maskedCode = maskSensitiveData(code)
  const truncatedCode = truncateCode(maskedCode)

  let prompt: string

  const langName = getLanguageDisplayName(lang)

  if (level === 'beginner') {
    prompt = `以下の${langName}コードを初心者向けに解説してください。
重要：必ず以下のJSON形式で返答してください。他の形式は使用しないでください。

{
  "summary": "コードの概要（初心者向けに平易な言葉で）",
  "constructs": ["使用されている主要な構文やAPIの説明"],
  "pitfalls": ["注意すべき点や落とし穴"],
  "alternative": "より良い書き方の例（あれば、15行以内）"
}

コード：
${truncatedCode}`
  } else if (level === 'intermediate') {
    prompt = `以下の${langName}コードを中級者向けに解説してください。
重要：必ず以下のJSON形式で返答してください。他の形式は使用しないでください。

{
  "summary": "コードの構造と設計意図の説明",
  "constructs": ["使用されている構文やAPIとその選択理由"],
  "pitfalls": ["潜在的な問題やエッジケース"],
  "alternative": "より良い実装例（あれば、15行以内）"
}

コード：
${truncatedCode}`
  } else {
    prompt = `以下の${langName}コードを上級者向けに解説してください。
重要：必ず以下のJSON形式で返答してください。他の形式は使用しないでください。

{
  "summary": "アーキテクチャレベルの分析とパフォーマンス特性",
  "constructs": ["技術選択の根拠、計算量、メモリ効率性"],
  "pitfalls": ["スケーラビリティの課題、並行性の問題、セキュリティリスク"],
  "alternative": "業界のベストプラクティスに基づく最適化案（あれば、15行以内）"
}

パフォーマンス（時間/空間計算量）、保守性、拡張性、セキュリティの観点から分析してください。

コード：
${truncatedCode}`
  }

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
            content:
              'あなたはコードレビューの専門家です。必ず指定されたJSON形式のみで応答してください。説明文や追加のテキストは一切含めないでください。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: API_CONFIG.TEMPERATURE,
        max_tokens: API_CONFIG.MAX_TOKENS,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw createAPIError(response.status, errorText)
    }

    const data = (await response.json()) as OpenAIResponse
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('OpenAIからの応答が空です')
    }

    // JSONとしてパース
    try {
      const explanation = JSON.parse(content) as Explanation

      // 必須フィールドの検証
      if (
        !explanation.summary ||
        !Array.isArray(explanation.constructs) ||
        !Array.isArray(explanation.pitfalls)
      ) {
        throw new Error('不正な応答フォーマット')
      }

      // 配列が空の場合はデフォルト値を設定
      if (explanation.constructs.length === 0) {
        explanation.constructs = ['コード構造の解析に失敗しました']
      }
      if (explanation.pitfalls.length === 0) {
        explanation.pitfalls = ['特に注意すべき点は見つかりませんでした']
      }

      return explanation
    } catch (parseError) {
      // JSONパースに失敗した場合のフォールバック
      console.error('JSON parse error:', parseError)
      console.error('Received content:', content)
      return {
        summary:
          'AIの応答を解析できませんでした。別のコードで再度お試しください。',
        constructs: ['解析に失敗しました'],
        pitfalls: ['AIの応答が期待された形式ではありませんでした'],
        alternative: undefined,
      }
    }
  } catch (error) {
    console.error('API error:', error)
    throw new Error(
      `API エラー: ${error instanceof Error ? error.message : ERROR_MESSAGES.API_ERROR}`,
    )
  }
}

/**
 * コードの差分を解析して解説を生成します
 * @param before - 変更前のコード
 * @param after - 変更後のコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @param apiKey - OpenAI APIキー
 * @returns 解説オブジェクト
 * @throws {Error} APIエラーまたはパースエラーの場合
 */
export const explainDiffHeuristically = async (
  before: string,
  after: string,
  lang: string,
  level: ExplainLevel,
  apiKey: string,
): Promise<Explanation> => {
  assertAPIKey(apiKey)

  // コードのマスキングと切り詰め
  const maskedBefore = maskSensitiveData(before)
  const maskedAfter = maskSensitiveData(after)
  const truncatedBefore = truncateCode(maskedBefore)
  const truncatedAfter = truncateCode(maskedAfter)

  const langName = getLanguageDisplayName(lang)

  const levelText =
    level === 'beginner'
      ? '初心者'
      : level === 'intermediate'
        ? '中級者'
        : '上級者'
  const prompt = `以下の${langName}コードの変更を${levelText}向けに解説してください。
重要：必ず以下のJSON形式で返答してください。他の形式は使用しないでください。

{
  "summary": "変更内容の要約（何が追加/削除/変更されたか）",
  "constructs": ["変更後のコードで使用されている主要な構文やAPI"],
  "pitfalls": ["変更によって生じた新たな注意点や解消された問題"],
  "alternative": "さらに良い実装例（あれば、15行以内）"
}

変更前のコード：
${truncatedBefore}

変更後のコード：
${truncatedAfter}`

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
            content:
              'あなたはコードレビューの専門家です。必ず指定されたJSON形式のみで応答してください。説明文や追加のテキストは一切含めないでください。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: API_CONFIG.TEMPERATURE,
        max_tokens: API_CONFIG.MAX_TOKENS,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw createAPIError(response.status, errorText)
    }

    const data = (await response.json()) as OpenAIResponse
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('OpenAIからの応答が空です')
    }

    // JSONとしてパース
    try {
      const explanation = JSON.parse(content) as Explanation

      // 必須フィールドの検証
      if (
        !explanation.summary ||
        !Array.isArray(explanation.constructs) ||
        !Array.isArray(explanation.pitfalls)
      ) {
        throw new Error('不正な応答フォーマット')
      }

      // 配列が空の場合はデフォルト値を設定
      if (explanation.constructs.length === 0) {
        explanation.constructs = ['コード構造の解析に失敗しました']
      }
      if (explanation.pitfalls.length === 0) {
        explanation.pitfalls = ['特に注意すべき点は見つかりませんでした']
      }

      return explanation
    } catch (parseError) {
      // JSONパースに失敗した場合のフォールバック
      console.error('JSON parse error:', parseError)
      console.error('Received content:', content)
      return {
        summary:
          'AIの応答を解析できませんでした。別のコードで再度お試しください。',
        constructs: ['解析に失敗しました'],
        pitfalls: ['AIの応答が期待された形式ではありませんでした'],
        alternative: undefined,
      }
    }
  } catch (error) {
    console.error('API error:', error)
    throw new Error(
      `API エラー: ${error instanceof Error ? error.message : ERROR_MESSAGES.API_ERROR}`,
    )
  }
}
