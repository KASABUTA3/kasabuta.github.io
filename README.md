# KASABUTA Gallery

公開用の創作物ギャラリーサイトです。GitHub Pages で公開することを前提に、相対パスと 404 対応を整備しています。

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開きます。

## 作品データの更新

`assets/js/main.js` の `WORKS` 配列に作品情報を追加してください。

```js
{
  title: '作品名',
  description: '概要',
  tag: 'illust',
  date: '2025.01',
  linkLabel: '詳細ページ',
  linkUrl: 'https://example.com'
}
```

## GitHub Pages 公開

1. リポジトリの `Settings` → `Pages` を開く
2. `Branch: main` / `/(root)` を選択して保存
3. 公開URLを共有
