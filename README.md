# KASABUTA PORTAL — GitHub Pages Site

このリポジトリは GitHub Pages で公開する KASABUTA の個人サイト兼コミュニティ拠点です。

## 🎨 テーマ

**Royal Black** — 高級感のある黒とゴールドをベースにした和風デザイン

## 📁 プロジェクト構成

```
kasabuta.github.io/
├── index.html                 # メインポータルページ
├── assets/
│   ├── css/
│   │   └── styles.css        # Royal Blackテーマのスタイルシート
│   ├── js/
│   │   └── main.js           # インタラクティブ機能（XSS対策済み）
│   └── img/
│       ├── logo.svg          # KASABUTAロゴ
│       ├── car.svg           # 車アイコン
│       └── placeholder-feature.svg  # 機能プレースホルダー
└── README.md
```

## ✨ 主な機能

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **シリーズ投稿欄**: タイトル・説明・作者名を入力してカードを動的生成
- **セキュリティ対策**: XSS脆弱性対策を実装
- **外部リンク**: X (Twitter) と Discord への直接アクセス
- **アニメーション**: フェードイン効果とホバーエフェクト
- **日本語フォント**: Shippori Mincho（明朝体）を使用

## 🚀 ローカル開発

```bash
# リポジトリルートで簡易HTTPサーバを起動
python3 -m http.server 8000

# ブラウザで開く
# http://localhost:8000
```

## 🌐 GitHub Pages デプロイ

1. リポジトリの `Settings > Pages` を開く
2. **Source** で `Branch: main` を選択
3. フォルダは `/(root)` を選択
4. `Save` をクリック

公開URL: `https://KASABUTA3.github.io/`

## 📝 バージョン

現在のバージョン: **v0.1.0**

## 🔗 外部リンク

- [X (Twitter)](https://x.com/kasabuta2025?s=21)
- [Discord](https://discord.gg/vyXmVjPB)

---

© 2025 KASABUTA