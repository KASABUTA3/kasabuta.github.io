# KASABUTA3 — GitHub Pages Site

このリポジトリは GitHub Pages で公開するための静的ポートフォリオサイトを含みます。今回、以下のファイルを追加しました:

- `index.html`
- `assets/css/style.css`
- `assets/js/main.js`
- `assets/img/logo.svg`, `assets/img/car.svg`, `assets/img/placeholder-feature.svg`

ローカルで確認する手順（簡易）:

```bash
# 1. リポジトリルートで簡易HTTPサーバを起動
python3 -m http.server 8000
# 2. ブラウザで開く
# http://localhost:8000
```

GitHub Pages 有効化手順はこのリポジトリの `Settings > Pages` で `Branch: main` と `/(root)` を選択して保存してください。公開URLは `https://<your-username>.github.io/<repo-name>/` 形式になります（owner が `KASABUTA3` の場合、`https://KASABUTA3.github.io/kasabuta.github.io/` またはリポジトリ名が `username.github.io` の場合は `https://KASABUTA3.github.io/`）。

詳しい変更内容はリポジトリ内の `index.html` と `assets/` を参照してください。
# kasabuta.github.io