# Verification

- Node 24.22.1, npm 11.20.0: `npm ci --ignore-scripts` completed. The existing dependency graph reported peer dependency warnings and 15 moderate audit findings.
- `npm run build` with non-secret placeholder Firebase environment values: passed, including TypeScript checking and all 11 static pages.
- With TypeScript 6.0.3, `npm test` passed all 7 tests, `npm run typecheck` passed, and `npm run lint` passed with one existing React Hook warning.
- `npm ci --ignore-scripts` passed with Node 24. `npm run audit` failed on minimatch advisory GHSA-g3hv-75wg-m249; the affected versions are transitive development dependencies and the suggested fix changes major versions.
- Without Firebase environment values, the build reaches prerendering but fails with `auth/invalid-api-key`.
