import { useEffect } from 'react'
import { Button } from '../../../shared/components/Button'
import * as styles from './Snackbar.css'

/**
 * スナックバーコンポーネントのプロパティ
 */
interface SnackbarProps {
  /** 表示するメッセージ */
  message: string
  /** スナックバーの種類 */
  type: 'info' | 'warning' | 'error' | 'success'
  /** 表示状態 */
  isOpen: boolean
  /** 閉じるときのコールバック */
  onClose: () => void
  /** 自動的に閉じるまでの時間（ミリ秒） */
  duration?: number
}

/**
 * スナックバーコンポーネント
 * 
 * 画面下部に一時的なメッセージを表示します。
 * 指定時間後に自動的に非表示になります。
 * 
 * @param props - コンポーネントのプロパティ
 * @returns スナックバーコンポーネント
 */
export const Snackbar = ({
  message,
  type,
  isOpen,
  onClose,
  duration = 3000,
}: SnackbarProps) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <Button variant="ghost" size="sm" onClick={onClose}>
        ✕
      </Button>
    </div>
  )
}