import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Language } from '../../../shared/types'
import { getLanguageDisplayName } from '../../../shared/lib/language'
import { Button } from '../../../shared/components/Button'
import * as styles from './PromptInput.css'

/**
 * プロンプト入力コンポーネントのプロパティ
 */
interface PromptInputProps {
  /** 現在選択されている言語 */
  language: Language
  /** コード生成実行中かどうか */
  loading: boolean
  /** コード生成ハンドラー */
  onGenerateCode: (prompt: string) => void
}

/**
 * プロンプト入力コンポーネント
 *
 * AIにコード生成を依頼するためのプロンプトを入力するエリアを提供します。
 * Enterキーで送信、Shift+Enterで改行が可能です。
 *
 * @param props - コンポーネントのプロパティ
 * @returns プロンプト入力コンポーネント
 */
export const PromptInput = ({
  language,
  loading,
  onGenerateCode,
}: PromptInputProps) => {
  const [prompt, setPrompt] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const [previousPrompt, setPreviousPrompt] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  /**
   * キーボードイベントハンドラー
   * Enterキーで改行、Ctrl(Cmd)+Enterで送信
   * 日本語入力中（IME変換中）は送信しない
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }

  /**
   * プロンプトを送信
   */
  const handleSubmit = () => {
    const trimmedPrompt = prompt.trim()
    if (trimmedPrompt && !loading) {
      setPreviousPrompt(trimmedPrompt)
      onGenerateCode(trimmedPrompt)
      setPrompt('')
    }
  }

  /**
   * テキストエリアの高さを内容に合わせて自動調整
   */
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  /**
   * loading 状態が変更されたときの処理
   */
  useEffect(() => {
    if (!loading && previousPrompt) {
      setPreviousPrompt('')
    }
  }, [loading, previousPrompt])

  return (
    <div
      className={`${styles.promptInputContainer} ${loading ? styles.promptInputContainerLoading : ''}`}
    >
      <div className={styles.promptInputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.promptTextarea}
          value={loading && previousPrompt ? previousPrompt : prompt}
          onChange={(e) => {
            if (!loading) {
              setPrompt(e.target.value)
              adjustTextareaHeight()
            }
          }}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={`${getLanguageDisplayName(language)} のコードを生成・変更する指示を入力...（Enter で改行、Ctrl+Enter で送信）`}
          disabled={loading}
          rows={2}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!prompt.trim()}
          loading={loading}
        >
          コード生成
        </Button>
      </div>
      <div className={styles.promptHint}>
        例:
        「フィボナッチ数列を計算する関数を作成して」「エラーハンドリングを追加して」「型定義を厳密にして」
      </div>
    </div>
  )
}
