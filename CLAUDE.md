# AI Coach - コーディングルール

## プロジェクト構成

### ディレクトリ構造（co-location）

```
src/
├── app/                  # アプリケーションのエントリーポイント
├── features/             # 機能別のディレクトリ（統一された構造）
│   ├── api-key/          # APIキー管理
│   ├── code-editor/      # コードエディタ
│   ├── explanation/      # コード解説
│   └── toolbar/          # ツールバー
└── shared/               # 共有リソース
    ├── constants/        # 定数
    ├── lib/              # ユーティリティ
    ├── styles/           # グローバルスタイル
    └── types/            # 型定義
```

### Co-location 原則

- 関連するファイルは同じディレクトリに配置
- 各featureは統一された構造（components/, hooks/, lib/, index.ts）
- feature内部は相対パス、feature間はindex.ts経由でimport

## コーディング規約

### 1. 日本語・英語間のスペース

日本語と英語（単語・記号）の間には半角スペースを入れます。

```markdown
// ✅ 正しい例
JavaScript のコードを生成
React コンポーネント
API キー
TypeScript ファイル

// ❌ 間違った例
JavaScriptのコードを生成
Reactコンポーネント
APIキー
TypeScriptファイル
```

### 2. 関数定義

```typescript
// ✅ アロー関数で定義
export const myFunction = (param: string): string => {
  return param.toUpperCase()
}

// ❌ function宣言は使わない（型アサーション関数を除く）
```

### 3. Export/Import

```typescript
// ✅ Named export
export const MyComponent = () => { ... }

// ❌ Default export（設定ファイルを除く）
```

### 4. JSDoc コメント

```typescript
/**
 * コード内の機密情報をマスクします
 * @param code - マスクするコード
 * @returns 機密情報がマスクされたコード
 */
```

### 5. 型定義・定数

- 共通の型: `shared/types/index.ts`
- 共通の定数: `shared/constants/index.ts`
- 機能固有のものは各featureで管理可

### 6. エラーハンドリング

```typescript
try {
  // 処理
} catch (err) {
  setError(handleAPIError(err)) // 統一された処理
}
```

### 7. コンポーネント設計

- ビジネスロジック → カスタムフック
- UIロジック → コンポーネント

### 8. スタイリング

- vanilla-extract で CSS-in-JS
- 各コンポーネントに`.css.ts`
- テーマ: `shared/styles/theme.css.ts`

### 9. セキュリティ

- 機密情報は必ずマスキング
- 最大200行/10KB制限
- API キーは localStorage/環境変数

### 10. ドキュメント管理

- コード変更時は必ず CLAUDE.md と README.md を更新

## 開発環境

### 技術スタック

React 19 + TypeScript + Vite + Monaco Editor + vanilla-extract

### コマンド

```bash
pnpm run dev       # 開発
pnpm run build     # ビルド
pnpm tsc --noEmit  # 型チェック
pnpm run lint      # ESLint チェック
pnpm run format    # コードフォーマット
```

## チェックリスト

- [ ] アロー関数で定義
- [ ] Named export使用
- [ ] JSDocコメント記載
- [ ] 適切な場所に型定義・定数配置
- [ ] エラーハンドリング統一
- [ ] コンポーネントの責務分離
- [ ] Co-location原則遵守
- [ ] vanilla-extractでスタイル定義
- [ ] ドキュメント更新

## 参考資料

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [vanilla-extract](https://vanilla-extract.style/)
