# 更新・運用・切り戻し

1. Node 24とnpmで両プロジェクトのnpm ciを行う。Yarnは使用しない。
2. .env.exampleから設定を作り自分のFirebaseプロジェクトを設定。NEXT_PUBLIC_*は公開されるため管理用秘密鍵を置かない。
3. READMEの検証コマンドを実行し、PRのCIを確認する。
4. Next本番起動はnpm run start --prefix src。ビルド後にnpm prune --omit=dev --prefix srcで開発依存を除去する。Dockerfileは開発用なのでそのまま本番公開しない。
5. 静的サイトのCSSを変更する場合だけ生成CSSを確認して反映。今回の公開アセットは変更しない。既存firebase.jsonは静的Hostingのみを対象とし、ユーザーの方針により今回の作業にデプロイは含めない。Vercel Previewの確認はマージ条件としない。

Docker開発はdocker compose up --build -d。既存ボリュームはdocker compose exec frontend npm ci後にrestartする。

## 診断・残作業

Next起動ログと /、/account、/post、/memoriesの表示、Firebaseログイン・読み書きを管理者のテスト環境で確認する。監査APIエラーは接続確認後に再試行し、成功扱いにしない。

bracesは[Issue #2](https://github.com/sintaro-katuta/GY_project/issues/2)で追跡。期限前に上流の修正版を確認し、更新と例外削除を行う。監査全体の無効化では回避しない。

旧.env内の実資格情報の有無と本番Firestore/Storageルールは[Issue #3](https://github.com/sintaro-katuta/GY_project/issues/3)で所有者が確認する。有効な実資格情報が履歴にあれば失効・再発行する。

## 切り戻し

データ形式変更やmigrationはない。このPRをrevertし、lockfile込みの旧成果物を再ビルド・再配布する。旧版には既知の脆弱性があるため必要なら公開を制限して復旧する。実.envは再コミットせず、運用環境から供給する。

Vercel Previewの失敗に関する[Issue #5](https://github.com/sintaro-katuta/GY_project/issues/5)は、デプロイ不要の方針により対応不要として終了する。将来デプロイを再開する場合に、その時点の環境設定と表示・ログイン・権限を確認する。
