/**
 * 言語コードから表示名を取得します
 * @param lang - 言語コード
 * @returns 言語の表示名
 */
export const getLanguageDisplayName = (lang: string): string => {
  switch (lang) {
    case 'typescript':
      return 'TypeScript'
    case 'javascript':
      return 'JavaScript'
    case 'python':
      return 'Python'
    case 'go':
      return 'Go'
    case 'ruby':
      return 'Ruby'
    case 'php':
      return 'PHP'
    default:
      return lang
  }
}
