# 設計と実装

- Next.js 13.0.4 → 16.4.2、Firebase 9系 → 13.1.0。Pages Router、React 18（18.3.1）を維持。React 18はNext 16で非推奨なので次のメジャー更新時はReact 19移行を別途行う。
- 参照のないMySQL依存とlib/db.js、翻訳系と設定、MUI/Emotion、@types/firebase等を削除。Firebaseは型を同梱する。
- Firebase内部の固定された古い通信依存には@grpc/grpc-jsとwebsocket-driverの修正済み互換系列をoverrideする。Firebase更新時に必要性を再評価する。
- GulpをSass CLI / PostCSS CLI / Autoprefixerへ置換。既存CSSの手修正を壊さないよう生成先を.build/cssに分ける。
- Yarnをnpmに統一し、DockerはNode 24でnpm ciを使用。開発依存をdevDependenciesに分離する。
- アップロードhelperはAPI handlerではないのでpages/apiからlib/upload.jsへ移す。Lottie playerはDOMを必要とするためdynamic(..., { ssr: false })でロードする。
- Next更新に合わせ画像host設定、TypeScript bundler解決、flat ESLint設定を使用する。React Compiler未採用の既存React 18実装を保つためCompiler向け新規3ルールは無効とし、従来のhooks/Web Vitalsのlintを保つ。ESLint 10は現在のreact/jsx-a11yプラグインのpeer条件外なので9.39.5を使用する（サポート終了警告は既知）。

## 継続監査

scripts/audit.cjsは元advisory単位で評価し、親への伝播は区別する。security/exceptions.jsonはbraces@3.0.3・GHSA-vfj7-8cjw-p6xm・開発専用・2026-11-22以前に限定。新規GHSA、別版、runtime、取得失敗を許可しない。[一次情報](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)で修正版未公開を確認した。

security.test.cjsは開始時の全アドバイザリの範囲を両lockfileに照合する。firebase.test.cjsはSDK初期化、Auth/Firestore/Storage、移設helperの正常系・エラー伝播をネットワークなしで検証する。

CIとDependabotは両npmプロジェクトとActionsを対象にする。CIのFirebase設定は架空の値でシークレットを使わない。本番依存は追加で例外なしのnpm auditを実行する。

受け入れ条件1/4は監査・例外テスト、2はlockfile/Node/Docker、3はSDKテスト・build/typecheck/lint、5は環境設定の除去・サンプル・ignoreとIssue #3に対応する。
