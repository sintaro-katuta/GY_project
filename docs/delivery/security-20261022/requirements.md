# 要件・調査範囲

2026-10-22、実装前に[Issue #1](https://github.com/sintaro-katuta/GY_project/issues/1)を作成。依存更新、ビルド互換性、継続監査を対象とする。

開始時は305アラート、125種類のGHSA、40パッケージ。Critical 20 / High 153 / Medium 112 / Low 20（manifest別重複を含む）。全検出範囲を秘密情報なしの `security/baseline-advisories.json` に保存した。

CVE-2026-111759はsrcの両lockfileのmarkdown-it@12.3.2を対象とする。未使用の@types/firebaseを含む旧Firebase依存グラフのprotobufjs-cli → jsdoc → markdown-itという経路だった。ソースにMarkdown処理やtypographer設定は見つからず、旧推移依存の除去でパッケージ自体を削除する。

[一次情報](https://github.com/markdown-it/markdown-it/security/advisories/GHSA-r7fv-28h4-cvq7): typographer: trueが攻撃条件。14.3.2未満、または15.0.0以上15.0.2未満が影響範囲。

## 受け入れ条件

1. 対象CVEと修正可能な既知の依存脆弱性を除去する。未修正のものは制限・期限・追跡先を明記する。
2. npm lockfileで再現可能にし、Docker/CI/開発手順を揃える。
3. 本番ビルド、型検査、lint、Firebase互換性テスト、既知アドバイザリ照合を行う。
4. 新規脆弱性、監査APIエラー、runtimeへの例外混入、期限切れで継続監査を失敗させる。
5. 環境設定を新規コミットへ含めず、旧資格情報・Firebaseルールの確認を引き継ぐ。

実環境への書き込み、デプロイ、認証情報の失効、Git履歴の書き換えは行わない。本番Firebase Rulesはリポジトリにないため評価できない。全脆弱性が存在しないことを証明する監査ではない。
