import { SelectHTMLAttributes } from 'react'
import * as styles from './Select.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  options: SelectOption[]
  variant?: 'default' | 'compact'
}

/**
 * 統一されたスタイルのセレクトコンポーネント
 */
export const Select = ({
  options,
  variant = 'default',
  ...props
}: SelectProps) => {
  return (
    <select
      className={variant === 'compact' ? styles.selectCompact : styles.select}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
