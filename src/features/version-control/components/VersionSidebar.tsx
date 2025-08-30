import { useState } from 'react'
import { CodeVersion } from '../../../shared/types'
import { Button } from '../../../shared/components/Button'
import * as styles from './VersionSidebar.css'

interface VersionSidebarProps {
  versions: CodeVersion[]
  selectedVersionId: string
  onSelectVersion: (versionId: string) => void
}

/**
 * バージョン管理サイドバー
 */
export const VersionSidebar = ({
  versions,
  selectedVersionId,
  onSelectVersion,
}: VersionSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'たった今'
    if (minutes < 60) return `${minutes}分前`
    if (hours < 24) return `${hours}時間前`
    if (days < 7) return `${days}日前`

    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <div
        className={`${styles.sidebar} ${isOpen ? '' : styles.sidebarClosed}`}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>バージョン履歴</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
          >
            {isOpen ? '◀' : '▶'}
          </Button>
        </div>
        <div className={styles.versionList}>
          {versions.map((version) => (
            <button
              key={version.id}
              className={`${styles.versionItem} ${
                selectedVersionId === version.id ? styles.versionItemActive : ''
              }`}
              onClick={() => onSelectVersion(version.id)}
            >
              <span className={styles.versionId}>{version.id}</span>
              <span className={styles.versionDate}>
                {formatDate(version.savedAt)}
              </span>
            </button>
          ))}
        </div>
      </div>
      {!isOpen && (
        <div className={styles.sidebarToggle}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            aria-label="サイドバーを開く"
          >
            ▶
          </Button>
        </div>
      )}
    </>
  )
}
