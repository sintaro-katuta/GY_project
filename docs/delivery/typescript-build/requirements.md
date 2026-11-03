# TypeScript build recovery

- Restore the production build after TypeScript 7 rejects `target: es5`.
- Keep the change limited to the compiler target; preserve the existing Firebase configuration and application behavior.
- Acceptance: type checking and production build succeed with the project's Node 24 runtime and valid Firebase environment values.
