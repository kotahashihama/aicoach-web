import { ToolbarProps, ExplainLevel, Language } from '../../../shared/types'
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
    'python',
    'go',
    'ruby',
    'php',
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
  onSaveCode,
  canExplainDiff,
  loading,
  code,
  savedCode,
  isExplaining,
  isExplainingDiff,
  versions,
  baseVersionId,
  headVersionId,
  onBaseVersionChange,
  onHeadVersionChange,
  onOpenSettings,
  theme,
  onThemeChange,
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
                { value: 'javascript', label: 'JavaScript' },
                { value: 'python', label: 'Python' },
                { value: 'go', label: 'Go' },
                { value: 'ruby', label: 'Ruby' },
                { value: 'php', label: 'PHP' },
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
        </div>

        <div className={styles.divider} />

        <div className={styles.buttonsGroup}>
          <Button
            variant="secondary"
            onClick={onSaveCode}
            disabled={!code.trim() || code === savedCode}
            title={
              !code.trim()
                ? 'コードを入力してください'
                : code === savedCode
                  ? '変更がありません'
                  : ''
            }
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

          <div className={styles.divider} />

          <div className={styles.diffControls}>
            <div className={styles.diffSelectors}>
              <div className={styles.diffSelector}>
                <label className={styles.diffLabel}>base</label>
                <Select
                  variant="compact"
                  value={baseVersionId}
                  onChange={(e) => onBaseVersionChange(e.target.value)}
                  disabled={loading}
                  options={[
                    { value: '-', label: '-' },
                    ...versions
                      .filter((v) => v.number !== null)
                      .map((v) => ({ value: v.id, label: v.id })),
                  ]}
                />
              </div>
              <span className={styles.diffArrow}>→</span>
              <div className={styles.diffSelector}>
                <label className={styles.diffLabel}>head</label>
                <Select
                  variant="compact"
                  value={headVersionId}
                  onChange={(e) => onHeadVersionChange(e.target.value)}
                  disabled={loading}
                  options={versions.map((v) => {
                    const baseVersion =
                      baseVersionId === '-'
                        ? null
                        : versions.find((ver) => ver.id === baseVersionId)
                    const isDisabled =
                      baseVersion &&
                      v.number !== null &&
                      baseVersion.number !== null &&
                      v.number < baseVersion.number
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
              title={
                !canExplainDiff ? '異なるバージョンを選択してください' : ''
              }
            >
              変更差分を解説
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.toolbarRight}>
        <Button
          variant="ghost"
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`${theme === 'dark' ? 'ライト' : 'ダーク'}モードに切り替え`}
          className={styles.themeToggle}
        >
          <span className="material-icons">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </Button>
        <Button
          variant="ghost"
          onClick={onOpenSettings}
          aria-label="設定"
          className={styles.settingsButton}
        >
          <span className="material-icons">settings</span>
        </Button>
      </div>
    </div>
  )
}
