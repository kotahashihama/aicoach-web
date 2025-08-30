import {
  ExplainLevel,
  Explanation as ExplanationType,
} from '../../../shared/types'
import { StreamingExplanation } from './StreamingExplanation'
import * as styles from './ExplanationPanel.css'

interface ExplanationPanelProps {
  error: string | null
  loading: boolean
  streamingContent: string
  explanation: ExplanationType | null
  isStreaming: boolean
  level: ExplainLevel
}

/**
 * 解説パネルコンポーネント
 * エラー、ローディング、ストリーミング解説、最終解説の表示を管理します
 */
export const ExplanationPanel = ({
  error,
  loading,
  streamingContent,
  explanation,
  isStreaming,
  level,
}: ExplanationPanelProps) => {
  return (
    <div className={styles.explanationPanel}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {loading && !streamingContent && (
        <div className={styles.loading}>解析中...</div>
      )}
      {streamingContent && (
        <StreamingExplanation
          content={streamingContent}
          level={level}
          isStreaming={isStreaming}
        />
      )}
      {/* Explanationコンポーネントは使用しない - Markdownレンダリングのため常にStreamingExplanationを使用 */}
      {!loading && !error && !streamingContent && !explanation && (
        <div className={styles.emptyState}>
          コードを入力して「このコードを解説」をクリックしてください
        </div>
      )}
    </div>
  )
}
