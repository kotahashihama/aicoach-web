import { useState, useRef, useEffect } from 'react'
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
import { useAPIKey, ApiKeyModal } from '../features/api-key'
import { Snackbar, useSnackbar } from '../features/snackbar'
import { VersionSidebar, useVersionControl } from '../features/version-control'
import { useTheme } from '../features/theme'
import { useResizable } from '../shared/hooks/useResizable'
import { ExplainLevel, Language, MonacoEditorInstance } from '../shared/types'
import { ERROR_MESSAGES } from '../shared/constants'
import { handleAPIError } from '../shared/lib/errorHandling'
import * as styles from './App.css'

/**
 * メインアプリケーションコンポーネント
 * コードエディタ、ツールバー、解説パネルを統合して提供します
 */
export const App = () => {
  const [level, setLevel] = useState<ExplainLevel>('beginner')
  const [language, setLanguage] = useState<Language>('typescript')
  const [codeGenerating, setCodeGenerating] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [isExplainingDiff, setIsExplainingDiff] = useState(false)
  const [baseVersionId, setBaseVersionId] = useState<string>('-')
  const [headVersionId, setHeadVersionId] = useState<string>('#現在')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { apiKey, updateAPIKey } = useAPIKey()
  const { theme, setTheme } = useTheme()
  const { percentage, containerRef, handleMouseDown } = useResizable({
    initialPercentage: 50,
    minPercentage: 30,
    maxPercentage: 70,
    storageKey: 'editor-explanation-split',
  })
  const {
    versions,
    currentCode,
    setCurrentCode,
    selectedVersionId,
    selectedVersionCode,
    selectVersion,
    saveCurrentVersion,
  } = useVersionControl()
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

  // 最新の保存されたバージョンを取得
  const latestSavedVersion = versions.find((v) => v.number !== null)

  // baseが未設定の場合は最新の保存バージョンを設定
  useEffect(() => {
    if (baseVersionId === '-' && latestSavedVersion) {
      setBaseVersionId(latestSavedVersion.id)
    }
  }, [baseVersionId, latestSavedVersion])

  // 選択されたバージョンが変更されたら解説をクリア
  useEffect(() => {
    // 解説をクリアするロジックを追加
  }, [selectedVersionId])

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
    const codeToExplain =
      selectedVersionId === '#現在' ? currentCode : selectedVersionCode
    if (!codeToExplain.trim()) {
      setValidationError(ERROR_MESSAGES.NO_CODE)
      return
    }

    setValidationError(null)
    setIsExplaining(true)
    const generator = explainHeuristicallyStream(
      codeToExplain,
      language,
      level,
      apiKey,
    )
    await executeStream(generator)
    setIsExplaining(false)
  }

  /**
   * 現在のコードを保存します
   */
  const handleSaveCode = () => {
    const savedVersion = saveCurrentVersion()
    setBaseVersionId(savedVersion.id)
    snackbar.showSnackbar(`${savedVersion.id} として保存しました`, 'success')
  }

  /**
   * コードの差分解説を実行します
   */
  const handleExplainDiff = async () => {
    if (baseVersionId === '-') {
      setValidationError('基準となるバージョンを選択してください')
      return
    }

    const baseCode = versions.find((v) => v.id === baseVersionId)?.code || ''
    const headCode =
      headVersionId === '#現在'
        ? currentCode
        : versions.find((v) => v.id === headVersionId)?.code || ''

    if (!baseCode.trim() || !headCode.trim()) {
      setValidationError(ERROR_MESSAGES.NO_DIFF_CODE)
      return
    }

    setValidationError(null)
    setIsExplainingDiff(true)
    const generator = explainDiffHeuristicallyStream(
      baseCode,
      headCode,
      language,
      level,
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
      const result = await generateCode(prompt, language, apiKey, currentCode)

      // 不適切な要求の場合
      if (!result.isValidRequest) {
        snackbar.showSnackbar(
          '適切なコード生成の指示を入力してください',
          'warning',
        )
        setCodeGenerating(false)
        return
      }

      // 適切な要求の場合はコードを更新
      setCurrentCode(result.code)
    } catch (err) {
      setValidationError(handleAPIError(err))
    } finally {
      setCodeGenerating(false)
    }
  }

  // 差分解説が可能かどうか
  const canExplainDiff =
    baseVersionId !== '-' && !!headVersionId && baseVersionId !== headVersionId

  return (
    <div className={styles.app}>
      <VersionSidebar
        versions={versions}
        selectedVersionId={selectedVersionId}
        onSelectVersion={selectVersion}
      />

      <div className={styles.contentArea}>
        <Toolbar
          level={level}
          onLevelChange={setLevel}
          language={language}
          onLanguageChange={setLanguage}
          onExplain={handleExplain}
          onExplainDiff={handleExplainDiff}
          onSaveCode={handleSaveCode}
          canExplainDiff={canExplainDiff}
          loading={loading}
          code={currentCode}
          savedCode={''}
          isExplaining={isExplaining}
          isExplainingDiff={isExplainingDiff}
          versions={versions}
          baseVersionId={baseVersionId}
          headVersionId={headVersionId}
          onBaseVersionChange={setBaseVersionId}
          onHeadVersionChange={setHeadVersionId}
          onOpenSettings={() => setIsSettingsOpen(true)}
          theme={theme}
          onThemeChange={setTheme}
        />

        <div className={styles.mainContent} ref={containerRef}>
          <div
            className={styles.leftColumn}
            style={{ width: `${percentage}%` }}
          >
            <CodeEditor
              code={selectedVersionCode}
              language={language}
              onChange={setCurrentCode}
              onMount={handleEditorDidMount}
              disabled={codeGenerating || selectedVersionId !== '#現在'}
              theme={theme}
            />
          </div>

          <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />

          <ExplanationPanel
            error={error}
            loading={loading}
            streamingContent={streamingContent}
            explanation={explanation}
            isStreaming={isStreaming}
            level={level}
          />
        </div>

        <PromptInput
          language={language}
          loading={codeGenerating}
          onGenerateCode={handleGenerateCode}
        />
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={snackbar.closeSnackbar}
      />

      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onApiKeyChange={updateAPIKey}
      />
    </div>
  )
}
