# ADD READ REVIEW EXTENSION

## Setup

1. node のインストール

https://qiita.com/1000ch/items/41ea7caffe8c42c5211c

2. yarn のインストール

https://yarnpkg.com/lang/ja/docs/install/#mac-stable

3. 依存ライブラリのインストール

```
$ yarn install
```

4. build

```
# 本番用: Chromeにpublishするとき
# minifyしたjsが書き出されます
$ yarn build

# 開発用: 開発を行うとき
# ファイルの更新を検知して自動でbuildしてくれます
$ yarn watch
```

5. chrome extension にアップロード

chrome://extensions/にアクセス

Load unpacked ボタンをクリックして/dist 以下のディレクトリを選択

使える！
