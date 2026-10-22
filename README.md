# GY_project

IRでの体験や思い出を共有するSNS（`src`）とFirebase Hosting用の静的サイト（`public`）。

## 開発

Node.js 24 / npmを使用する。両ディレクトリのpackage-lock.jsonをそれぞれ管理する。

```sh
cp .env.example .env
cp src/.env.example src/.env.local
# 自分のFirebaseプロジェクトの値を入力する。実際の値はコミットしない。
npm ci --prefix src
npm ci --prefix public
npm run dev --prefix src
```

http://localhost:3000/ を開く。Dockerの場合は設定後に `docker compose up --build -d` を実行し、http://localhost:3200/ を開く。依存更新後は既存ボリュームにも `docker compose exec frontend npm ci` を実行してrestartする。

## 検証

```sh
npm test --prefix src
npm run lint --prefix src
npm run audit --prefix src
npm run audit --prefix public
npm run build --prefix src
npm run typecheck --prefix src
npm run build --prefix public
```

静的サイトのCSS生成先は `public/.build/css/index.css`。既存 `public/css/index.css` にはSassに未反映の手修正があるため、差分を確認して反映する。`npm run watch --prefix public` はSass監視のみで、最終prefix処理はbuildで行う。

監査はネットワーク取得失敗時も失敗する。修正版未公開の開発依存bracesのみ、2026-11-22までの期限付き例外がある（[Issue #2](https://github.com/sintaro-katuta/GY_project/issues/2)）。本番依存の監査には例外を設けない。

[対応資料](docs/delivery/security-20261022/requirements.md)に調査範囲、検証、更新・切り戻し手順を記載する。旧環境設定とFirebase本番ルールの確認は[Issue #3](https://github.com/sintaro-katuta/GY_project/issues/3)で追跡する。

元のDockerテンプレート: [mizu0715/docker-next.js](https://github.com/mizu0715/docker-next.js)
