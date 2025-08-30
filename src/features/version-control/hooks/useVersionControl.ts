import { useState, useEffect, useCallback } from 'react'
import { CodeVersion } from '../../../shared/types'

const STORAGE_KEY = 'aicoach_code_versions'

/**
 * バージョン管理のカスタムフック
 */
export const useVersionControl = () => {
  const [versions, setVersions] = useState<CodeVersion[]>([])
  const [currentCode, setCurrentCode] = useState('')
  const [selectedVersionId, setSelectedVersionId] = useState('#現在')
  const [nextVersionNumber, setNextVersionNumber] = useState(1)

  // sessionStorage からバージョンを読み込み
  useEffect(() => {
    const storedData = sessionStorage.getItem(STORAGE_KEY)
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        const loadedVersions = parsed.versions.map((v: any) => ({
          ...v,
          savedAt: new Date(v.savedAt),
        }))
        setVersions(loadedVersions)
        setNextVersionNumber(parsed.nextVersionNumber || loadedVersions.length + 1)
      } catch (err) {
        console.error('Failed to load versions:', err)
      }
    }
  }, [])

  // sessionStorage に保存
  const saveToStorage = useCallback((versions: CodeVersion[], nextNumber: number) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          versions,
          nextVersionNumber: nextNumber,
        })
      )
    } catch (err) {
      console.error('Failed to save versions:', err)
    }
  }, [])

  /**
   * 現在のコードを新しいバージョンとして保存
   */
  const saveCurrentVersion = useCallback(() => {
    const newVersion: CodeVersion = {
      id: `#${nextVersionNumber}`,
      number: nextVersionNumber,
      code: currentCode,
      savedAt: new Date(),
    }
    
    const newVersions = [newVersion, ...versions]
    setVersions(newVersions)
    setNextVersionNumber(nextVersionNumber + 1)
    saveToStorage(newVersions, nextVersionNumber + 1)
    
    return newVersion
  }, [currentCode, versions, nextVersionNumber, saveToStorage])

  /**
   * 指定されたバージョンを選択
   */
  const selectVersion = useCallback((versionId: string) => {
    setSelectedVersionId(versionId)
  }, [])

  /**
   * 現在選択中のバージョンのコード
   */
  const selectedVersionCode = selectedVersionId === '#現在' 
    ? currentCode 
    : versions.find(v => v.id === selectedVersionId)?.code || ''

  /**
   * すべてのバージョン（#現在を含む）
   */
  const allVersions: CodeVersion[] = [
    {
      id: '#現在',
      number: null,
      code: currentCode,
      savedAt: new Date(),
    },
    ...versions,
  ]

  return {
    versions: allVersions,
    currentCode,
    setCurrentCode,
    selectedVersionId,
    selectedVersionCode,
    selectVersion,
    saveCurrentVersion,
  }
}