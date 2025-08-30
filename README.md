# AI Coach Web

記述されたコードを**その場で理解できる**Webアプリ。OpenAI APIを使用してコードの解説を生成します。

![ai-coach-demo](https://via.placeholder.com/800x400?text=AI+Coach+Demo)

## 機能

- **初心者/中級者/上級者向けの解説レベル切り替え**
- **コード変更の差分解説**
- **リアルタイムストリーミング表示**

## クイックスタート

```bash
# クローン
git clone https://github.com/kotahashihama/aicoach-web.git
cd aicoach-web

# インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

OpenAI APIキーの設定:

- 環境変数: `.env.example`を`.env`にコピーして`VITE_OPENAI_API_KEY`を設定
- またはアプリ内の入力欄に直接入力

## 使い方

### 基本的な使い方

1. **APIキーを設定**（初回のみ）
   - 右上の入力欄にOpenAI APIキーを入力
2. **コードを入力**
   - 左側のエディタに解説したいコードを貼り付け
3. **解説レベルを選択**
   - 初心者: 平易な言葉で基本概念を説明
   - 中級者: 設計意図や潜在的な問題点まで解説
   - 上級者: パフォーマンスやセキュリティの観点から分析
4. **「このコードを解説」をクリック**
   - 右側のパネルにAIによる解説が表示されます

### 差分解説機能

1. **まず通常の解説を実行**（必須）
   ```typescript
   // 例: 最初のコード
   async function fetchData() {
     const response = await fetch('/api/data')
     return response.json()
   }
   ```
2. **コードを修正**
   ```typescript
   // エラーハンドリングを追加
   async function fetchData() {
     try {
       const response = await fetch('/api/data')
       if (!response.ok) throw new Error('Failed')
       return response.json()
     } catch (error) {
       console.error(error)
       throw error
     }
   }
   ```
3. **「変更差分を解説」をクリック**
   - 変更内容と改善点が解説されます

## 技術スタック

- **Frontend**: React 19 + TypeScript + Vite
- **Editor**: Monaco Editor
- **Styling**: vanilla-extract
- **AI**: OpenAI API (gpt-4o)

## 開発

詳細は [CLAUDE.md](./CLAUDE.md) を参照

```bash
pnpm run dev       # 開発サーバー
pnpm run build     # ビルド
pnpm run typecheck # 型チェック
pnpm run lint      # ESLintチェック
pnpm run format    # Prettierフォーマット
```
