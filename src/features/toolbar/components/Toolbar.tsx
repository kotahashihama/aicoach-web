import { ToolbarProps, ExplainLevel, ExplainTone, Language } from '../../../shared/types'
import { Button } from '../../../shared/components/Button'
import { Select } from '../../../shared/components/Select'
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
 * トーンの値が有効なExplainTone型かどうかを判定する型ガード
 * @param value - 検証する値
 * @returns ExplainTone型として有効な場合はtrue
 */
const isExplainTone = (value: string): value is ExplainTone => {
  return value === 'casual' || value === 'normal' || value === 'formal'
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
  tone,
  onToneChange,
  language,
  onLanguageChange,
  onExplain,
  onExplainDiff,
  onSaveCode,
  canExplainDiff,
  loading,
  apiKey,
  onApiKeyChange,
  code,
  savedCode,
  isExplaining,
  isExplainingDiff,
  versions,
  baseVersionId,
  headVersionId,
  onBaseVersionChange,
  onHeadVersionChange,
}: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <div className={styles.selectorsGroup}>
          <div className={styles.languageSelector}>
            <label htmlFor="language" className={styles.selectorLabel}>
              言語
            </label>
            <Select
              id="language"
              value={language}
              onChange={(e) => {
                const value = e.target.value
                if (isLanguage(value)) {
                  onLanguageChange(value)
                }
              }}
              disabled={loading}
              options={[
                { value: 'typescript', label: 'TypeScript' },
                { value: 'typescriptreact', label: 'TypeScript JSX' },
                { value: 'javascript', label: 'JavaScript' },
                { value: 'javascriptreact', label: 'JavaScript JSX' },
                { value: 'python', label: 'Python' },
                { value: 'go', label: 'Go' },
                { value: 'ruby', label: 'Ruby' },
                { value: 'php', label: 'PHP' },
                { value: 'vue', label: 'Vue.js' },
              ]}
            />
          </div>

          <div className={styles.levelSelector}>
            <label htmlFor="level" className={styles.selectorLabel}>
              解説レベル
            </label>
            <Select
              id="level"
              value={level}
              onChange={(e) => {
                const value = e.target.value
                if (isExplainLevel(value)) {
                  onLevelChange(value)
                }
              }}
              disabled={loading}
              options={[
                { value: 'beginner', label: '初心者' },
                { value: 'intermediate', label: '中級者' },
                { value: 'advanced', label: '上級者' },
              ]}
            />
          </div>

          <div className={styles.toneSelector}>
            <label htmlFor="tone" className={styles.selectorLabel}>
              トーン
            </label>
            <Select
              id="tone"
              value={tone}
              onChange={(e) => {
                const value = e.target.value
                if (isExplainTone(value)) {
                  onToneChange(value)
                }
              }}
              disabled={loading}
              options={[
                { value: 'casual', label: 'カジュアル' },
                { value: 'normal', label: '通常' },
                { value: 'formal', label: 'フォーマル' },
              ]}
            />
          </div>
        </div>

        <div className={styles.buttonsGroup}>
          <Button
            variant="secondary"
            onClick={onSaveCode}
            disabled={!code.trim() || code === savedCode}
            title={!code.trim() ? 'コードを入力してください' : code === savedCode ? '変更がありません' : ''}
          >
            保存
          </Button>

          <Button
            variant="primary"
            onClick={onExplain}
            loading={isExplaining}
            disabled={!code.trim() || isExplainingDiff}
            title={!code.trim() ? 'コードを入力してください' : ''}
          >
            このコードを解説
          </Button>

          <div className={styles.diffControls}>
            <div className={styles.diffSelectors}>
              <div className={styles.diffSelector}>
                <label className={styles.diffLabel}>base:</label>
                <Select
                  variant="compact"
                  value={baseVersionId}
                  onChange={(e) => onBaseVersionChange(e.target.value)}
                  disabled={loading}
                  options={[
                    { value: '-', label: '-' },
                    ...versions
                      .filter(v => v.number !== null)
                      .map(v => ({ value: v.id, label: v.id }))
                  ]}
                />
              </div>
              <span className={styles.diffArrow}>→</span>
              <div className={styles.diffSelector}>
                <label className={styles.diffLabel}>head:</label>
                <Select
                  variant="compact"
                  value={headVersionId}
                  onChange={(e) => onHeadVersionChange(e.target.value)}
                  disabled={loading}
                  options={versions.map(v => {
                    const baseVersion = baseVersionId === '-' ? null : versions.find(ver => ver.id === baseVersionId)
                    const isDisabled = baseVersion && v.number !== null && baseVersion.number !== null && v.number < baseVersion.number
                    return {
                      value: v.id,
                      label: v.id,
                      disabled: isDisabled || false,
                    }
                  })}
                />
              </div>
            </div>
            <Button
              variant="primary"
              onClick={onExplainDiff}
              loading={isExplainingDiff}
              disabled={!canExplainDiff || isExplaining}
              title={!canExplainDiff ? '異なるバージョンを選択してください' : ''}
            >
              変更差分を解説
            </Button>
          </div>
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
