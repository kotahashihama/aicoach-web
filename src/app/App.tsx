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
import { PromptInput } from '../features/prompt-input'
import { generateCode } from '../features/code-generation'
import { useAPIKey } from '../features/api-key'
import { Snackbar, useSnackbar } from '../features/snackbar'
import { ExplainLevel, ExplainTone, Language, MonacoEditorInstance } from '../shared/types'
import { ERROR_MESSAGES } from '../shared/constants'
import { handleAPIError } from '../shared/lib/errorHandling'
import * as styles from './App.css'

/**
 * メインアプリケーションコンポーネント
 * コードエディタ、ツールバー、解説パネルを統合して提供します
 */
export const App = () => {
  const [code, setCode] = useState('')
  const [savedCode, setSavedCode] = useState('')
  const [level, setLevel] = useState<ExplainLevel>('beginner')
  const [tone, setTone] = useState<ExplainTone>('normal')
  const [language, setLanguage] = useState<Language>('typescript')
  const [codeGenerating, setCodeGenerating] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [isExplainingDiff, setIsExplainingDiff] = useState(false)
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
  const snackbar = useSnackbar()

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
    setIsExplaining(true)
    const generator = explainHeuristicallyStream(code, language, level, tone, apiKey)
    await executeStream(generator)
    setIsExplaining(false)
  }
  
  /**
   * 現在のコードを保存します
   */
  const handleSaveCode = () => {
    setSavedCode(code)
    snackbar.showSnackbar('コードを保存しました', 'success')
  }

  /**
   * コードの差分解説を実行します
   */
  const handleExplainDiff = async () => {
    if (!code.trim() || !savedCode.trim()) {
      setValidationError(ERROR_MESSAGES.NO_DIFF_CODE)
      return
    }

    setValidationError(null)
    setIsExplainingDiff(true)
    const generator = explainDiffHeuristicallyStream(
      savedCode,
      code,
      language,
      level,
      tone,
      apiKey,
    )
    await executeStream(generator)
    setIsExplainingDiff(false)
  }

  /**
   * プロンプトからコードを生成・変更します
   * 既存のコードがある場合はそれを起点として変更します
   * @param prompt - コード生成・変更のプロンプト
   */
  const handleGenerateCode = async (prompt: string) => {
    setCodeGenerating(true)
    setValidationError(null)
    
    try {
      const result = await generateCode(prompt, language, apiKey, code)
      
      // 不適切な要求の場合
      if (!result.isValidRequest) {
        snackbar.showSnackbar('適切なコード生成の指示を入力してください', 'warning')
        setCodeGenerating(false)
        return
      }
      
      // 適切な要求の場合はコードを更新
      setCode(result.code)
    } catch (err) {
      setValidationError(handleAPIError(err))
    } finally {
      setCodeGenerating(false)
    }
  }

  return (
    <div className={styles.app}>
      <Toolbar
        level={level}
        onLevelChange={setLevel}
        tone={tone}
        onToneChange={setTone}
        language={language}
        onLanguageChange={setLanguage}
        onExplain={handleExplain}
        onExplainDiff={handleExplainDiff}
        onSaveCode={handleSaveCode}
        canExplainDiff={!!savedCode && code !== savedCode}
        loading={loading}
        apiKey={apiKey}
        onApiKeyChange={updateAPIKey}
        code={code}
        savedCode={savedCode}
        isExplaining={isExplaining}
        isExplainingDiff={isExplainingDiff}
      />

      <PromptInput
        language={language}
        loading={codeGenerating}
        onGenerateCode={handleGenerateCode}
      />

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
            onMount={handleEditorDidMount}
            disabled={codeGenerating}
          />
        </div>

        <ExplanationPanel
          error={error}
          loading={loading}
          streamingContent={streamingContent}
          explanation={explanation}
          isStreaming={isStreaming}
          level={level}
        />
      </div>
      
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={snackbar.closeSnackbar}
      />
    </div>
  )
}
