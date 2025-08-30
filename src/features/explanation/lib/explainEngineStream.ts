import { ExplainLevel, Explanation } from '../../../shared/types'
import { maskSensitiveData, truncateCode } from '../../../shared/lib/mask'
import { createOpenAIStream, processStream } from './streamUtils'
import { buildCodePrompt, buildDiffPrompt } from './promptBuilder'
import { assertAPIKey } from '../../../shared/lib/errorHandling'

/**
 * コードをストリーミングで解説します
 * @param code - 解説するコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @param apiKey - OpenAI APIキー
 * @yields ストリーミングテキスト
 * @returns 最終的な解説オブジェクト
 */
export const explainHeuristicallyStream = async function* (
  code: string,
  lang: string,
  level: ExplainLevel,
  apiKey: string,
): AsyncGenerator<string, Explanation, unknown> {
  assertAPIKey(apiKey)

  const maskedCode = maskSensitiveData(code)
  const truncatedCode = truncateCode(maskedCode)
  const prompt = buildCodePrompt(truncatedCode, lang, level)

  const reader = await createOpenAIStream({ apiKey, prompt })
  const generator = processStream(reader)

  let fullContent = ''
  for await (const chunk of generator) {
    fullContent += chunk
    yield chunk
  }

  /** ストリーミング完了後、Markdown をパースして Explanation 形式に変換 */
  return parseMarkdownToExplanation(fullContent)
}

/**
 * コードの差分をストリーミングで解説します
 * @param before - 変更前のコード
 * @param after - 変更後のコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @param apiKey - OpenAI APIキー
 * @yields ストリーミングテキスト
 * @returns 最終的な解説オブジェクト
 */
export const explainDiffHeuristicallyStream = async function* (
  before: string,
  after: string,
  lang: string,
  level: ExplainLevel,
  apiKey: string,
): AsyncGenerator<string, Explanation, unknown> {
  assertAPIKey(apiKey)

  const maskedBefore = maskSensitiveData(before)
  const maskedAfter = maskSensitiveData(after)
  const truncatedBefore = truncateCode(maskedBefore)
  const truncatedAfter = truncateCode(maskedAfter)
  const prompt = buildDiffPrompt(truncatedBefore, truncatedAfter, lang, level)

  const reader = await createOpenAIStream({ apiKey, prompt })
  const generator = processStream(reader)

  let fullContent = ''
  for await (const chunk of generator) {
    fullContent += chunk
    yield chunk
  }

  return parseMarkdownToExplanation(fullContent)
}

/**
 * MarkdownテキストをExplanationオブジェクトに変換します
 * @param markdown - 変換するMarkdownテキスト
 * @returns 解説オブジェクト
 */
const parseMarkdownToExplanation = (markdown: string): Explanation => {
  const sections = markdown.split(/##\s+/g)

  let summary = ''
  let constructs: string[] = []
  let pitfalls: string[] = []
  let alternative: string | undefined

  for (const section of sections) {
    const lines = section.trim().split('\n')
    const title = lines[0]?.toLowerCase() || ''
    const content = lines.slice(1).join('\n').trim()

    if (title.includes('概要') || title.includes('変更')) {
      summary = content
    } else if (
      title.includes('構文') ||
      title.includes('api') ||
      title.includes('技術')
    ) {
      constructs = extractBulletPoints(content)
    } else if (
      title.includes('注意') ||
      title.includes('落とし穴') ||
      title.includes('エッジケース') ||
      title.includes('課題')
    ) {
      pitfalls = extractBulletPoints(content)
    } else if (
      title.includes('書き方') ||
      title.includes('実装') ||
      title.includes('改善') ||
      title.includes('最適化')
    ) {
      /** コードブロックを抽出 */
      const codeMatch = content.match(/```[\s\S]*?```/g)
      if (codeMatch) {
        alternative = codeMatch[0].replace(/```\w*\n?/g, '').trim()
      }
    }
  }

  /** デフォルト値の設定 */
  if (!summary) {
    summary = markdown.slice(0, 200) + '...'
  }
  if (constructs.length === 0) {
    constructs = ['解析結果を取得できませんでした']
  }
  if (pitfalls.length === 0) {
    pitfalls = ['特に注意すべき点は見つかりませんでした']
  }

  return {
    summary,
    constructs,
    pitfalls,
    alternative,
  }
}

/**
 * コンテンツから箇条書きを抽出します
 * @param content - 抽出元のコンテンツ
 * @returns 箇条書きの配列
 */
const extractBulletPoints = (content: string): string[] => {
  const lines = content.split('\n')
  const points: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.match(/^[-*・]\s+/) || trimmed.match(/^\d+\.\s+/)) {
      points.push(trimmed.replace(/^[-*・]\s+/, '').replace(/^\d+\.\s+/, ''))
    }
  }

  return points.length > 0 ? points : [content]
}
