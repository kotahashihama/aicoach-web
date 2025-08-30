import Editor from '@monaco-editor/react'
import type { OnMount } from '@monaco-editor/react'
import { Language, Theme } from '../../../shared/types'
import * as styles from './CodeEditor.css'

/**
 * コードエディタコンポーネントのプロパティ
 */
interface CodeEditorProps {
  /** エディタに表示するコード */
  code: string
  /** コードのプログラミング言語 */
  language: Language
  /** コードが変更されたときのコールバック */
  onChange: (value: string) => void
  /** エディタがマウントされたときのコールバック */
  onMount?: OnMount
  /** エディタを無効化するかどうか */
  disabled?: boolean
  /** 現在のテーマ */
  theme: Theme
}

/**
 * コードエディタコンポーネント
 *
 * Monaco Editorをラップし、設定済みのオプションで提供します。
 * ダークテーマ、行番号表示、自動レイアウトなどの機能を含みます。
 *
 * @param props - コンポーネントのプロパティ
 * @returns Monaco Editorを含むコンポーネント
 */
export const CodeEditor = ({
  code,
  language,
  onChange,
  onMount,
  disabled = false,
  theme,
}: CodeEditorProps) => {
  return (
    <div
      className={`${styles.editorPanel} ${disabled ? styles.editorPanelDisabled : ''}`}
    >
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => {
          try {
            onChange(value || '')
          } catch (error) {
            console.error('Failed to update code:', error)
          }
        }}
        onMount={onMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          readOnly: disabled,
        }}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
      />
    </div>
  )
}
