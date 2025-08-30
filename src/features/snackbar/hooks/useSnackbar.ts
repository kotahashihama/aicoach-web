import { useState, useCallback } from 'react'

/**
 * スナックバーの状態
 */
interface SnackbarState {
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  isOpen: boolean
}

/**
 * スナックバー管理用のカスタムフック
 * 
 * @returns スナックバーの状態と操作関数
 */
export const useSnackbar = () => {
  const [state, setState] = useState<SnackbarState>({
    message: '',
    type: 'info',
    isOpen: false,
  })

  /**
   * スナックバーを表示
   */
  const showSnackbar = useCallback((message: string, type: SnackbarState['type'] = 'info') => {
    setState({
      message,
      type,
      isOpen: true,
    })
  }, [])

  /**
   * スナックバーを閉じる
   */
  const closeSnackbar = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }))
  }, [])

  return {
    ...state,
    showSnackbar,
    closeSnackbar,
  }
}