import { useState } from 'react'
import { Explanation } from '../../../shared/types'
import { handleAPIError } from '../../../shared/lib/errorHandling'

/**
 * ストリーミング解説の結果
 */
interface UseStreamingExplanationResult {
  /** 最終的な解説結果 */
  explanation: Explanation | null
  /** ストリーミング中のコンテンツ */
  streamingContent: string
  /** ストリーミング中かどうか */
  isStreaming: boolean
  /** ローディング中かどうか */
  loading: boolean
  /** エラーメッセージ */
  error: string | null
  /** ストリーミングを実行する関数 */
  executeStream: (
    generator: AsyncGenerator<string, Explanation, unknown>,
  ) => Promise<void>
}

/**
 * ストリーミング解説の状態管理を行うフック
 * @returns ストリーミング解説の状態と実行関数
 */
export const useStreamingExplanation = (): UseStreamingExplanationResult => {
  const [explanation, setExplanation] = useState<Explanation | null>(null)
  const [streamingContent, setStreamingContent] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * ストリーミングを実行し、結果を状態に反映します
   * @param generator - ストリーミングジェネレータ
   */
  const executeStream = async (
    generator: AsyncGenerator<string, Explanation, unknown>,
  ) => {
    setLoading(true)
    setIsStreaming(true)
    setError(null)
    setExplanation(null)
    setStreamingContent('')

    try {
      let content = ''
      let finalExplanation: Explanation | null = null

      /** ジェネレータを完全に消費する */
      while (true) {
        const { done, value } = await generator.next()

        if (done) {
          /** 最終的な Explanation が返される */
          if (value) {
            finalExplanation = value
          }
          break
        }

        /** チャンクを追加 */
        content += value
        setStreamingContent(content)
      }

      if (finalExplanation) {
        setExplanation(finalExplanation)
      }

      /** ストリーミングコンテンツを保持（Markdownレンダリングのため） */
      // setStreamingContent(content) を維持
    } catch (err) {
      setError(handleAPIError(err))
    } finally {
      setLoading(false)
      setIsStreaming(false)
    }
  }

  return {
    explanation,
    streamingContent,
    isStreaming,
    loading,
    error,
    executeStream,
  }
}
