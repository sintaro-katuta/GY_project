# 検証記録

環境: macOS arm64 / Node 24.22.1 / npm 11.20.0。ActionsではNode 24 / Ubuntuでも実行する。

- 7テスト成功: Firebase app/Auth/Firestore/Storage初期化、upload空選択・正常系・失敗伝播、開始時のアラート範囲照合、監査例外の制限とエラー拒否。
- npm run lint --prefix src: エラー0。既存connect.tsxのeffect依存に警告1件。
- npm run build --prefix src: 11ページ生成成功。React 18非推奨警告あり。
- npm run typecheck --prefix src: 成功。
- npm run build --prefix public: 成功。既存Sassの@import非推奨警告あり。公開CSSは変更していない。
- npm ls --all: peer依存エラーなし。

Node 24で両プロジェクトのnpm ci --no-auditが成功（src 458 packages / public 52 packages）。GitHub Actions [run 39717845911](https://github.com/sintaro-katuta/GY_project/actions/runs/39717845911)（実装コミット920eb833）で全ステップ成功。全依存監査はsrcがHigh 5パッケージ（bracesの1 GHSAと親への伝播のみ）でblocked 0 / accepted 1、publicが0件。本番依存のnpm audit --omit=devは例外なしで0件。監査APIに一時的なタイムアウトがあり、取得失敗を成功扱いにはしていない。

条件1/4はsecurity.test.cjsとオンライン監査、2はlockfile/クリーンインストール、3はSDKテストとbuild/typecheck/lint、5はGit追跡対象・ignore設定とIssue #3に対応する。

未実施: 実Firebaseへのログイン・投稿や権限のE2E、デプロイ済みRulesの検査、Dockerイメージのビルド、コンテナOSのCVEスキャン。本番サービスへの変更はしていない。

ユーザーの方針によりデプロイは今回の対象外。Vercelの自動Preview失敗の原因は未確定だが、Preview検証はマージ条件から除外し、[Issue #5](https://github.com/sintaro-katuta/GY_project/issues/5)は対応不要として終了する。Vercel連携の解除状況を推測で断定せず、デプロイや連携設定の変更は行わない。

資料更新コミット331121dでも[GitHub Actions run 39730519867](https://github.com/sintaro-katuta/GY_project/actions/runs/39730519867)が全ステップ成功。依存監査・テスト・ビルドの検証結果は有効。
