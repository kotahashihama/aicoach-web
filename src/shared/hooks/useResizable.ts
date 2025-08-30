import { useState, useCallback, useEffect, useRef } from 'react'

interface UseResizableOptions {
  initialPercentage?: number
  minPercentage?: number
  maxPercentage?: number
  storageKey?: string
}

/**
 * リサイズ可能なパネルのロジックを管理するカスタムフック
 * @param options - リサイズオプション
 * @returns リサイズに必要な値と関数
 */
export const useResizable = ({
  initialPercentage = 50,
  minPercentage = 20,
  maxPercentage = 80,
  storageKey,
}: UseResizableOptions = {}) => {
  const [percentage, setPercentage] = useState<number>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = parseFloat(saved)
        if (
          !isNaN(parsed) &&
          parsed >= minPercentage &&
          parsed <= maxPercentage
        ) {
          return parsed
        }
      }
    }
    return initialPercentage
  })

  const isDraggingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDraggingRef.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newPercentage = (x / rect.width) * 100

      const clampedPercentage = Math.max(
        minPercentage,
        Math.min(maxPercentage, newPercentage),
      )

      setPercentage(clampedPercentage)

      if (storageKey) {
        localStorage.setItem(storageKey, clampedPercentage.toString())
      }
    },
    [minPercentage, maxPercentage, storageKey],
  )

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return {
    percentage,
    containerRef,
    handleMouseDown,
  }
}
