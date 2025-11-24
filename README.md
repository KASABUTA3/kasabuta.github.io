# KASABUTA EMPIRE — Black × Gold × Neon Portfolio

GitHub Pages でそのまま動くラグジュアリーなポートフォリオサイトです。`index.html` と `/assets` 一式のみで構成しているため、追加のビルド工程は不要です。

## 構成
- `index.html` — 各セクション（Hero / Manifesto / About / Works / Featured / Links / Contact）のマークアップ
- `assets/css/style.css` — 黒×金×ネオンのテーマスタイル、ガラスモーフィズム、レスポンシブ対応
- `assets/js/main.js` — ナビゲーションのトグル、スクロールリビール、背景パーティクル
- `assets/img/` — ロゴ・ヒーローシルエット・フィーチャー用プレースホルダSVG

## ローカル確認
```bash
python -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

## GitHub Pages 公開の目安
1. GitHub で本リポジトリを開く
2. **Settings > Pages** を選択
3. **Source** を `Deploy from a branch` に設定
4. **Branch** を デフォルトブランチ（例: `main` や `work`）に合わせて保存すると `https://<username>.github.io/kasabuta.github.io/` が公開URLになります

## 変更のヒント
- Works カードを増やす場合は、`#works` セクションの `<article class="work-card">` を複製しタイトルとテキストを調整
- フィーチャー画像は `assets/img/feature-*.svg` を任意の画像に差し替え可能
- カラーやタイポグラフィは `:root` のカスタムプロパティを書き換えることで簡単にテーマチェンジできます
