import { StreamingExplanationProps } from '../../../shared/types'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import * as styles from './StreamingExplanation.css'

/**
 * ストリーミング解説コンポーネント
 *
 * AIからのストリーミングレスポンスをリアルタイムで表示します。
 * Markdown形式のコンテンツをレンダリングし、ストリーミング中は
 * カーソルアニメーションを表示します。
 *
 * @param props - ストリーミング解説のプロパティ
 * @returns ストリーミング解説コンポーネント
 */
export const StreamingExplanation = ({
  content,
  isStreaming,
}: StreamingExplanationProps) => {
  const [displayContent, setDisplayContent] = useState('')

  useEffect(() => {
    setDisplayContent(content)
  }, [content])

  return (
    <div className={styles.explanationStreaming}>
      <div className={styles.markdownContent}>
        <ReactMarkdown>{displayContent}</ReactMarkdown>
        {isStreaming && <span className={styles.cursorBlink}>▊</span>}
      </div>
    </div>
  )
}
