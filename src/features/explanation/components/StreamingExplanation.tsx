import { StreamingExplanationProps } from '../../../shared/types'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '12px',
                    fontSize: '13px',
                    borderRadius: '4px',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {displayContent}
        </ReactMarkdown>
        {isStreaming && <span className={styles.cursorBlink}>▊</span>}
      </div>
    </div>
  )
}
