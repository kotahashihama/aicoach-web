import { useState, useEffect } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { Button } from '../../../shared/components/Button'
import * as styles from './ApiKeyModal.css'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  apiKey: string
  onApiKeyChange: (key: string) => void
}

/**
 * API キー設定モーダル
 */
export const ApiKeyModal = ({
  isOpen,
  onClose,
  apiKey,
  onApiKeyChange,
}: ApiKeyModalProps) => {
  const [tempApiKey, setTempApiKey] = useState(apiKey)

  useEffect(() => {
    if (isOpen) {
      setTempApiKey(apiKey)
    }
  }, [isOpen, apiKey])

  const handleSave = () => {
    onApiKeyChange(tempApiKey)
    onClose()
  }

  const handleCancel = () => {
    setTempApiKey(apiKey)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="API キー設定">
      <div className={styles.container}>
        <div className={styles.description}>
          <p>OpenAI API キーを入力してください。</p>
          <p className={styles.note}>
            API キーは <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI Dashboard</a> から取得できます。
          </p>
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="api-key-input" className={styles.label}>
            API キー
          </label>
          <input
            id="api-key-input"
            type="password"
            className={styles.input}
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="sk-..."
          />
        </div>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    </Modal>
  )
}