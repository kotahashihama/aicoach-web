import {
  API_CONFIG,
  SYSTEM_PROMPTS,
  ERROR_MESSAGES,
} from '../../../shared/constants'
import { StreamOptions } from '../../../shared/types'
import { createAPIError } from '../../../shared/lib/errorHandling'

/**
 * OpenAI APIのストリーミングレスポンスを作成します
 * @param options - ストリーミングオプション
 * @returns ストリームリーダー
 * @throws {APIError} APIエラーの場合
 */
export const createOpenAIStream = async ({
  apiKey,
  prompt,
}: StreamOptions): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
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
          content: SYSTEM_PROMPTS.CODE_REVIEW,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: API_CONFIG.TEMPERATURE,
      max_tokens: API_CONFIG.MAX_TOKENS,
      stream: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw createAPIError(response.status, errorText)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error(ERROR_MESSAGES.STREAM_ERROR)
  }

  return reader
}

/**
 * ストリームを処理してテキストチャンクを生成します
 * @param reader - ストリームリーダー
 * @yields テキストチャンク
 * @returns 最終的に完全なコンテンツを返すAsyncGenerator
 */
export const processStream = async function* (
  reader: ReadableStreamDefaultReader<Uint8Array>,
): AsyncGenerator<string, string, unknown> {
  const decoder = new TextDecoder()
  let buffer = ''
  let fullContent = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') continue

        try {
          const json = JSON.parse(data)
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            fullContent += content
            yield content
          }
        } catch {
          /** JSONパースエラーは無視 */
        }
      }
    }
  }

  return fullContent
}
