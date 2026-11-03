# Verification

- Node 24.22.1, npm 11.20.0: `npm ci --ignore-scripts` completed. The existing dependency graph reported peer dependency warnings and 15 moderate audit findings.
- `npm run build` with non-secret placeholder Firebase environment values: passed, including TypeScript checking and all 11 static pages.
- `npm test`: 4 tests passed; `firebase.test.cjs` failed to load `src/node_modules/typescript`. The installed TypeScript 7 package does not expose the JavaScript API that this pre-existing test requires. This is separate from the compiler target change.
- Without Firebase environment values, the build reaches prerendering but fails with `auth/invalid-api-key`.
