# Operations

Merge the fix and deploy using the existing Vercel workflow with Node 24 and the project's Firebase environment variables. Check that the build completes and the deployed pages load. If a regression appears, revert the target change; doing so with TypeScript 7 restores the original build failure, so a compatible TypeScript version would also be needed. No data migration is required.
