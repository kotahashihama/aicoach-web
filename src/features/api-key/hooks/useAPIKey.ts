import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '../../../shared/constants'

/**
 * OpenAI APIキーの管理を行うフック
 *
 * localStorageと環境変数からAPIキーを読み込み、
 * 更新時にlocalStorageに保存します。
 *
 * @returns APIキー管理用のオブジェクト
 * @returns apiKey - 現在のAPIキー
 * @returns updateAPIKey - APIキーを更新する関数
 */
export const useAPIKey = () => {
  const [apiKey, setApiKey] = useState('')

  /** localStorageからAPIキーを読み込み */
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem(STORAGE_KEYS.API_KEY)
      if (savedKey) {
        setApiKey(savedKey)
      } else {
        /** 環境変数からの読み込み（フォールバック） */
        const envKey = import.meta.env.VITE_OPENAI_API_KEY
        if (envKey) {
          setApiKey(envKey)
        }
      }
    } catch (error) {
      console.error('Failed to load API key from localStorage:', error)
    }
  }, [])

  /**
   * APIキーを更新し、localStorageに保存します
   *
   * @param newKey - 新しいAPIキー
   */
  const updateAPIKey = (newKey: string) => {
    try {
      setApiKey(newKey)
      if (newKey) {
        localStorage.setItem(STORAGE_KEYS.API_KEY, newKey)
      } else {
        localStorage.removeItem(STORAGE_KEYS.API_KEY)
      }
    } catch (error) {
      console.error('Failed to save API key to localStorage:', error)
      // localStorageが使用できない場合でも、メモリ上の値は更新
      setApiKey(newKey)
    }
  }

  return { apiKey, updateAPIKey }
}
