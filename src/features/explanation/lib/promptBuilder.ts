import { ExplainLevel, PromptSection } from '../../../shared/types'
import { getLanguageDisplayName } from '../../../shared/lib/language'

/**
 * 解説レベルごとのプロンプトセクション定義
 */
const PROMPT_SECTIONS: Record<ExplainLevel, Record<string, PromptSection>> = {
  beginner: {
    summary: {
      title: '## 概要',
      description: 'コードが何をしているのか、平易な言葉で説明してください。',
    },
    howItWorks: {
      title: '## 動作の仕組み',
      description:
        'コードがどう動くのか、重要な部分を中心に順を追って説明してください。',
    },
    keyTechniques: {
      title: '## 使われている技術',
      description:
        'コードで使われている主要な機能、メソッド、パターンを箇条書きで説明してください。',
    },
    watchOut: {
      title: '## 注意点',
      description:
        'このコードを使う時に注意すべき点や、よくあるミスを箇条書きで説明してください。',
    },
    tips: {
      title: '## ヒント',
      description:
        'このコードをより良く使うための実用的なアドバイスがあれば箇条書きで紹介してください。',
    },
  },
  intermediate: {
    summary: {
      title: '## 概要',
      description: 'コードの構造と設計意図を説明してください。',
    },
    howItWorks: {
      title: '## 動作の仕組み',
      description:
        'データの流れや処理のフロー、アルゴリズムのポイントを説明してください。',
    },
    keyTechniques: {
      title: '## 使われている技術',
      description:
        '設計パターン、フレームワークの機能、ベストプラクティスを箇条書きで説明してください。',
    },
    watchOut: {
      title: '## 注意点',
      description:
        'パフォーマンス上の懸念、エッジケース、メンテナンス時の課題を箇条書きで説明してください。',
    },
    tips: {
      title: '## 実装のコツ',
      description:
        'より効率的な実装方法、リファクタリングのポイントがあれば箇条書きで紹介してください。',
    },
    relatedLinks: {
      title: '## 参考リンク',
      description:
        '公式ドキュメントや関連記事があれば箇条書きで紹介してください。',
    },
  },
  advanced: {
    summary: {
      title: '## 概要',
      description:
        'アーキテクチャレベルの分析とパフォーマンス特性を説明してください。',
    },
    howItWorks: {
      title: '## 動作の仕組み',
      description:
        '内部実装の詳細、計算量、メモリ効率、並行処理の仕組みを説明してください。',
    },
    keyTechniques: {
      title: '## 技術的な選択',
      description:
        'アルゴリズムの選定理由、トレードオフ、最適化手法、システム設計の原則を箇条書きで説明してください。',
    },
    watchOut: {
      title: '## 潜在的な問題',
      description:
        'スケーラビリティ、セキュリティ、競合状態、メモリリークなどの深刻な問題を箇条書きで説明してください。',
    },
    tips: {
      title: '## 最適化のアプローチ',
      description:
        'プロファイリング結果に基づく最適化、代替アルゴリズムがあれば箇条書きで紹介してください。',
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

  let prompt = `以下の${langName}コードを解析して、理解しやすく解説してください。

**口調に関する指示：**
標準的な口調で解説してください。「〜です」「〜ます」を使ってください。

**文章作成時の重要な注意事項：**
- 日本語と英語（単語・記号・数字）の間には必ず半角スペースを入れてください
- 例：「JavaScript のコード」「API の使用」「React コンポーネント」「HTML 要素」

解説形式：

${sections.summary.title}
${sections.summary.description}

${sections.howItWorks.title}
${sections.howItWorks.description}

${sections.keyTechniques.title}
${sections.keyTechniques.description}

${sections.watchOut.title}
${sections.watchOut.description}`

  if (sections.tips) {
    prompt += `\n\n${sections.tips.title}\n${sections.tips.description}`
  }

  if (sections.relatedLinks) {
    prompt += `\n\n${sections.relatedLinks.title}\n${sections.relatedLinks.description}`
  }

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

**口調に関する指示：**
標準的な口調で解説してください。「〜です」「〜ます」を使ってください。

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
