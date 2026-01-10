# Web Orin
https://web-orin.vercel.app/

## サービス概要
当アプリは、仏壇にある「チーン」と鳴らすあの「お鈴」をWebで鳴らせるサービスです

## 制作した背景
ReactとRails APIを分離した構成を組み、Webアプリケーションがどのように通信し、動作しているのかを簡単なアプリを製作を通して理解することを目的として開発しました。

## 実装機能
- ベルボタンでお鈴の音が鳴る
- サイドメニュー
  - お鈴が鳴らされた回数
  - タイマー機能
  - コメント機能

## 使用技術

### バックエンド
- Ruby 3.3
- Rails 7.2（API モード）
- PostgreSQL（Neon）

### フロントエンド
- React
- TypeScript
- Vite

### インフラ / ホスティング
- Vercel（フロントエンド）
- Render（バックエンド）
- Neon（PostgreSQL）

### 開発環境
- Docker（Rails, Nginx）
- Node.js
- PostgreSQL（Neon development ブランチ）
