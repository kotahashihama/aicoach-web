/**
 * コード内の機密情報をマスクします
 * @param code - マスクするコード
 * @returns 機密情報がマスクされたコード
 */
export const maskSensitiveData = (code: string): string => {
  let masked = code

  /** APIキー風の文字列をマスク */
  masked = masked.replace(/\b(sk-[a-zA-Z0-9]{20,})\b/g, 'sk-***MASKED***')
  masked = masked.replace(/\b(AKIA[a-zA-Z0-9]{16,})\b/g, 'AKIA***MASKED***')
  masked = masked.replace(
    /\b(api[_-]?key\s*[:=]\s*["']?)([a-zA-Z0-9]{20,})(["']?)/gi,
    '$1***MASKED***$3',
  )

  /** JWT風のトークンをマスク */
  masked = masked.replace(
    /\b(ey[a-zA-Z0-9]{30,}\.[a-zA-Z0-9]+\.[a-zA-Z0-9_-]+)\b/g,
    'ey***MASKED***.***MASKED***.***MASKED***',
  )

  /** メールアドレスをマスク */
  masked = masked.replace(
    /\b([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g,
    '***@$2',
  )

  /** 電話番号をマスク（日本の形式） */
  masked = masked.replace(/\b(0\d{1,4}-?\d{1,4}-?\d{4})\b/g, '***-****-****')
  masked = masked.replace(
    /\b(\+81\s?\d{1,4}-?\d{1,4}-?\d{4})\b/g,
    '+81 ***-****-****',
  )

  /** クレジットカード番号風の数字をマスク */
  masked = masked.replace(
    /\b(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})\b/g,
    '****-****-****-****',
  )

  /** パスワード風の文字列をマスク */
  masked = masked.replace(
    /(password\s*[:=]\s*["']?)([^"'\s]+)(["']?)/gi,
    '$1***MASKED***$3',
  )
  masked = masked.replace(
    /(secret\s*[:=]\s*["']?)([^"'\s]+)(["']?)/gi,
    '$1***MASKED***$3',
  )

  return masked
}

/**
 * コードを指定された行数またはバイト数で切り詰めます
 * @param code - 切り詰めるコード
 * @param maxLines - 最大行数（デフォルト: 200）
 * @param maxBytes - 最大バイト数（デフォルト: 10240バイト = 10KB）
 * @returns 切り詰められたコード
 */
export const truncateCode = (
  code: string,
  maxLines: number = 200,
  maxBytes: number = 10240,
): string => {
  const lines = code.split('\n')

  // 行数制限
  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).join('\n') + '\n// ... (truncated)'
  }

  // バイト数制限
  const encoder = new TextEncoder()
  const bytes = encoder.encode(code)
  if (bytes.length > maxBytes) {
    const decoder = new TextDecoder()
    const truncated = decoder.decode(bytes.slice(0, maxBytes))
    return truncated + '\n// ... (truncated)'
  }

  return code
}
