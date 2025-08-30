import { ToolbarProps, ExplainLevel, Language } from '../../../shared/types'
import * as styles from './Toolbar.css'

/**
 * 言語の値が有効なLanguage型かどうかを判定する型ガード
 * @param value - 検証する値
 * @returns Language型として有効な場合はtrue
 */
const isLanguage = (value: string): value is Language => {
  const validLanguages: Language[] = [
    'typescript',
    'javascript',
    'typescriptreact',
    'javascriptreact',
    'python',
    'go',
    'ruby',
    'php',
    'vue',
  ]
  return validLanguages.includes(value as Language)
}

/**
 * 解説レベルの値が有効なExplainLevel型かどうかを判定する型ガード
 * @param value - 検証する値
 * @returns ExplainLevel型として有効な場合はtrue
 */
const isExplainLevel = (value: string): value is ExplainLevel => {
  return (
    value === 'beginner' || value === 'intermediate' || value === 'advanced'
  )
}

/**
 * ツールバーコンポーネント
 *
 * エディタの上部に配置され、言語選択、解説レベル選択、
 * 解説実行ボタン、APIキー入力フィールドを提供します。
 *
 * @param props - ツールバーのプロパティ
 * @returns ツールバーコンポーネント
 */
export const Toolbar = ({
  level,
  onLevelChange,
  language,
  onLanguageChange,
  onExplain,
  onExplainDiff,
  canExplainDiff,
  loading,
  apiKey,
  onApiKeyChange,
}: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <div className={styles.selectorsGroup}>
          <div className={styles.languageSelector}>
            <label htmlFor="language" className={styles.selectorLabel}>
              言語
            </label>
            <select
              id="language"
              className={styles.select}
              value={language}
              onChange={(e) => {
                const value = e.target.value
                if (isLanguage(value)) {
                  onLanguageChange(value)
                }
              }}
              disabled={loading}
            >
              <option value="typescript">TypeScript</option>
              <option value="typescriptreact">TypeScript JSX</option>
              <option value="javascript">JavaScript</option>
              <option value="javascriptreact">JavaScript JSX</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
              <option value="vue">Vue.js</option>
            </select>
          </div>

          <div className={styles.levelSelector}>
            <label htmlFor="level" className={styles.selectorLabel}>
              解説レベル
            </label>
            <select
              id="level"
              className={styles.select}
              value={level}
              onChange={(e) => {
                const value = e.target.value
                if (isExplainLevel(value)) {
                  onLevelChange(value)
                }
              }}
              disabled={loading}
            >
              <option value="beginner">初心者</option>
              <option value="intermediate">中級者</option>
              <option value="advanced">上級者</option>
            </select>
          </div>
        </div>

        <div className={styles.buttonsGroup}>
          <button
            className={styles.btnPrimary}
            onClick={onExplain}
            disabled={loading}
          >
            {loading ? '解析中...' : 'このコードを解説'}
          </button>

          <button
            className={styles.btnSecondary}
            onClick={onExplainDiff}
            disabled={!canExplainDiff || loading}
            title={!canExplainDiff ? '最初に解説を実行してください' : ''}
          >
            変更差分を解説
          </button>
        </div>
      </div>

      <div className={styles.toolbarRight}>
        <div className={styles.apiKeyInput}>
          <label htmlFor="api-key" className={styles.apiKeyLabel}>
            OpenAI API キー
          </label>
          <input
            id="api-key"
            className={styles.apiKeyInputField}
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}
