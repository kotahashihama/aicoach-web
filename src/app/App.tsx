import { useState, useRef } from 'react'
import type { OnMount } from '@monaco-editor/react'
import { Toolbar } from '../features/toolbar'
import {
  ExplanationPanel,
  useStreamingExplanation,
  explainHeuristicallyStream,
  explainDiffHeuristicallyStream,
} from '../features/explanation'
import { CodeEditor } from '../features/code-editor'
import { useAPIKey } from '../features/api-key'
import { ExplainLevel, Language, MonacoEditorInstance } from '../shared/types'
import { ERROR_MESSAGES } from '../shared/constants'
import * as styles from './App.css'

/**
 * メインアプリケーションコンポーネント
 * コードエディタ、ツールバー、解説パネルを統合して提供します
 */
export const App = () => {
  const [code, setCode] = useState('')
  const [previousCode, setPreviousCode] = useState('')
  const [level, setLevel] = useState<ExplainLevel>('beginner')
  const [language, setLanguage] = useState<Language>('typescript')
  const { apiKey, updateAPIKey } = useAPIKey()
  const {
    explanation,
    streamingContent,
    isStreaming,
    loading,
    error: streamError,
    executeStream,
  } = useStreamingExplanation()
  const [validationError, setValidationError] = useState<string | null>(null)

  const editorRef = useRef<MonacoEditorInstance | null>(null)

  const error = streamError || validationError

  /**
   * エディタのマウント時に呼ばれるハンドラ
   * エディタインスタンスを保持しますが、現在は未使用
   * @param editor - Monaco Editorのインスタンス
   */
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  /**
   * コードの解説を実行します
   */
  const handleExplain = async () => {
    if (!code.trim()) {
      setValidationError(ERROR_MESSAGES.NO_CODE)
      return
    }

    setValidationError(null)
    const generator = explainHeuristicallyStream(code, language, level, apiKey)
    await executeStream(generator)
    setPreviousCode(code)
  }

  /**
   * コードの差分解説を実行します
   */
  const handleExplainDiff = async () => {
    if (!code.trim() || !previousCode.trim()) {
      setValidationError(ERROR_MESSAGES.NO_DIFF_CODE)
      return
    }

    setValidationError(null)
    const generator = explainDiffHeuristicallyStream(
      previousCode,
      code,
      language,
      level,
      apiKey,
    )
    await executeStream(generator)
  }

  return (
    <div className={styles.app}>
      <Toolbar
        level={level}
        onLevelChange={setLevel}
        language={language}
        onLanguageChange={setLanguage}
        onExplain={handleExplain}
        onExplainDiff={handleExplainDiff}
        canExplainDiff={!!previousCode}
        loading={loading}
        apiKey={apiKey}
        onApiKeyChange={updateAPIKey}
      />

      <div className={styles.mainContent}>
        <CodeEditor
          code={code}
          language={language}
          onChange={setCode}
          onMount={handleEditorDidMount}
        />

        <ExplanationPanel
          error={error}
          loading={loading}
          streamingContent={streamingContent}
          explanation={explanation}
          isStreaming={isStreaming}
          level={level}
        />
      </div>
    </div>
  )
}
