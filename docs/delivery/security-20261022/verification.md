# 検証記録

環境: macOS arm64 / Node 24.22.1 / npm 11.20.0。ActionsではNode 24 / Ubuntuでも実行する。

- 7テスト成功: Firebase app/Auth/Firestore/Storage初期化、upload空選択・正常系・失敗伝播、開始時のアラート範囲照合、監査例外の制限とエラー拒否。
- npm run lint --prefix src: エラー0。既存connect.tsxのeffect依存に警告1件。
- npm run build --prefix src: 11ページ生成成功。React 18非推奨警告あり。
- npm run typecheck --prefix src: 成功。
- npm run build --prefix public: 成功。既存Sassの@import非推奨警告あり。公開CSSは変更していない。
- npm ls --all: peer依存エラーなし。

Node 24で両プロジェクトのnpm ci --no-auditが成功（src 458 packages / public 52 packages）。オンライン監査とCIの最終結果は追記する。監査APIに一時的なタイムアウトがあり、取得失敗を成功扱いにはしていない。

条件1/4はsecurity.test.cjsとオンライン監査、2はlockfile/クリーンインストール、3はSDKテストとbuild/typecheck/lint、5はGit追跡対象・ignore設定とIssue #3に対応する。

未実施: 実Firebaseへのログイン・投稿や権限のE2E、デプロイ済みRulesの検査、Dockerイメージのビルド、コンテナOSのCVEスキャン。本番サービスへの変更はしていない。
