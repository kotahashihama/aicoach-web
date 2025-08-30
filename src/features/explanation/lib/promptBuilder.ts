import { ExplainLevel, PromptSection } from '../../../shared/types'
import { getLanguageDisplayName } from '../../../shared/lib/language'

/**
 * 解説レベルごとのプロンプトセクション定義
 */
const PROMPT_SECTIONS: Record<ExplainLevel, Record<string, PromptSection>> = {
  beginner: {
    summary: {
      title: '## 概要',
      description: 'コードの概要を初心者向けに平易な言葉で説明してください。',
    },
    constructs: {
      title: '## 主要な構文・API',
      description:
        '使用されている主要な構文やAPIを箇条書きで説明してください。',
    },
    pitfalls: {
      title: '## 注意点・落とし穴',
      description: '注意すべき点や落とし穴を箇条書きで説明してください。',
    },
    alternative: {
      title: '## より良い書き方',
      description:
        'より良い書き方の例があれば、15行以内のコードで示してください。',
    },
  },
  intermediate: {
    summary: {
      title: '## 概要',
      description: 'コードの構造と設計意図を説明してください。',
    },
    constructs: {
      title: '## 主要な構文・API',
      description:
        '使用されている構文やAPIとその選択理由を箇条書きで説明してください。',
    },
    pitfalls: {
      title: '## 注意点・エッジケース',
      description: '潜在的な問題やエッジケースを箇条書きで説明してください。',
    },
    alternative: {
      title: '## より良い実装例',
      description: 'より良い実装例があれば、15行以内のコードで示してください。',
    },
  },
  advanced: {
    summary: {
      title: '## 概要',
      description:
        'アーキテクチャレベルの分析とパフォーマンス特性を説明してください。',
    },
    constructs: {
      title: '## 技術的詳細',
      description:
        '技術選択の根拠、計算量、メモリ効率性を箇条書きで説明してください。',
    },
    pitfalls: {
      title: '## 潜在的な課題',
      description:
        'スケーラビリティの課題、並行性の問題、セキュリティリスクを箇条書きで説明してください。',
    },
    alternative: {
      title: '## 最適化案',
      description:
        '業界のベストプラクティスに基づく最適化案があれば、15行以内のコードで示してください。',
    },
  },
}

/**
 * コード解説用のプロンプトを構築します
 * @param code - 解説するコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @returns 構築されたプロンプト
 */
export const buildCodePrompt = (
  code: string,
  lang: string,
  level: ExplainLevel,
): string => {
  const sections = PROMPT_SECTIONS[level]
  const langName = getLanguageDisplayName(lang)

  let prompt = `以下の${langName}コードを解析して、以下の形式で解説してください。

**文章作成時の重要な注意事項：**
- 日本語と英語（単語・記号・数字）の間には必ず半角スペースを入れてください
- 例：「JavaScript のコード」「API の使用」「React コンポーネント」「HTML 要素」

解説形式：

${sections.summary.title}
${sections.summary.description}

${sections.constructs.title}
${sections.constructs.description}

${sections.pitfalls.title}
${sections.pitfalls.description}

${sections.alternative.title}
${sections.alternative.description}`

  if (level === 'advanced') {
    prompt +=
      '\n\nパフォーマンス（時間/空間計算量）、保守性、拡張性、セキュリティの観点から分析してください。'
  }

  prompt += `\n\n入力：\n${code}`

  return prompt
}

/**
 * コード差分解説用のプロンプトを構築します
 * @param before - 変更前のコード
 * @param after - 変更後のコード
 * @param lang - プログラミング言語
 * @param level - 解説レベル
 * @returns 構築されたプロンプト
 */
export const buildDiffPrompt = (
  before: string,
  after: string,
  lang: string,
  level: ExplainLevel,
): string => {
  const langName = getLanguageDisplayName(lang)
  const levelText =
    level === 'beginner'
      ? '初心者'
      : level === 'intermediate'
        ? '中級者'
        : '上級者'

  return `以下の${langName}コードの変更を${levelText}向けに解説してください。

**文章作成時の重要な注意事項：**
- 日本語と英語（単語・記号・数字）の間には必ず半角スペースを入れてください
- 例：「JavaScript のコード」「API の使用」「React コンポーネント」「HTML 要素」

## 変更の概要
何が追加/削除/変更されたか要約してください。

## 変更後の構文・API
変更後のコードで使用されている主要な構文やAPIを箇条書きで説明してください。

## 注意点
変更によって生じた新たな注意点や解消された問題を箇条書きで説明してください。

## さらなる改善案
さらに良い実装例があれば、15行以内のコードで示してください。

変更前のコード：
${before}

変更後のコード：
${after}`
}
