import { ReactNode, ButtonHTMLAttributes } from 'react'
import { styles } from './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

/**
 * 統一されたボタンコンポーネント
 * @param variant - ボタンのスタイルバリアント
 * @param size - ボタンのサイズ
 * @param loading - ローディング状態
 * @param fullWidth - 幅いっぱいに広げるか
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = [
    styles.button,
    styles.variants[variant],
    styles.sizes[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonClass} disabled={disabled || loading} {...props}>
      {loading ? <span>処理中...</span> : children}
    </button>
  )
}
