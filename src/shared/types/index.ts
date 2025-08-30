/**
 * コード解説のレベル
 * - beginner: 初心者向け（基本的な概念から丁寧に説明）
 * - intermediate: 中級者向け（ある程度の知識を前提）
 * - advanced: 上級者向け（詳細な技術的説明）
 */
export type ExplainLevel = 'beginner' | 'intermediate' | 'advanced'

/**
 * 解説のトーン（口調）
 * - casual: カジュアル（親しみやすい口調）
 * - normal: 通常（標準的な口調）
 * - formal: フォーマル（丁寧な口調）
 */
export type ExplainTone = 'casual' | 'normal' | 'formal'

/**
 * サポートされているプログラミング言語
 */
export type Language =
  | 'typescript'
  | 'javascript'
  | 'typescriptreact' // TypeScript JSX (TSX)
  | 'javascriptreact' // JavaScript JSX
  | 'python'
  | 'go'
  | 'ruby'
  | 'php'
  | 'vue'

/**
 * コード解説の内容
 */
export interface Explanation {
  /** コードの概要説明 */
  summary: string
  /** 使用されている言語構造や構文 */
  constructs: string[]
  /** 注意すべき点や落とし穴 */
  pitfalls: string[]
  /** より良い代替案（オプション） */
  alternative?: string
}

/**
 * コードバージョン
 */
export interface CodeVersion {
  /** バージョンID（#1, #2, ... または #現在） */
  id: string
  /** バージョン番号（#現在の場合はnull） */
  number: number | null
  /** コード内容 */
  code: string
  /** 保存日時 */
  savedAt: Date
}

/* ===========================
 * Component Props
 * =========================== */

/**
 * Toolbarコンポーネントのプロップス
 */
export interface ToolbarProps {
  level: ExplainLevel
  onLevelChange: (level: ExplainLevel) => void
  tone: ExplainTone
  onToneChange: (tone: ExplainTone) => void
  language: Language
  onLanguageChange: (language: Language) => void
  onExplain: () => void
  onExplainDiff: () => void
  onSaveCode: () => void
  canExplainDiff: boolean
  loading: boolean
  apiKey: string
  onApiKeyChange: (key: string) => void
  code: string
  savedCode: string
  isExplaining: boolean
  isExplainingDiff: boolean
  versions: CodeVersion[]
  baseVersionId: string
  headVersionId: string
  onBaseVersionChange: (id: string) => void
  onHeadVersionChange: (id: string) => void
}

/**
 * Explanationコンポーネントのプロップス
 */
export interface ExplanationProps {
  explanation: Explanation
  level: ExplainLevel
}

/**
 * StreamingExplanationコンポーネントのプロップス
 */
export interface StreamingExplanationProps {
  content: string
  level: ExplainLevel
  isStreaming: boolean
}

/* ===========================
 * API Related Types
 * =========================== */

/**
 * OpenAIストリーミングのオプション
 */
export interface StreamOptions {
  apiKey: string
  prompt: string
}

/**
 * プロンプトセクションの定義
 */
export interface PromptSection {
  /** セクションのタイトル */
  title: string
  /** セクションの説明文 */
  description: string
}

/* ===========================
 * Monaco Editor Types
 * =========================== */

/**
 * Monaco Editorのインスタンス型
 * @see https://microsoft.github.io/monaco-editor/
 */
export type MonacoEditorInstance = {
  getValue: () => string
  setValue: (value: string) => void
  getModel: () => unknown
  focus: () => void
  dispose: () => void
}
