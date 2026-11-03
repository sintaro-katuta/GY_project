# Design

Set the TypeScript target to ES2017 and pin TypeScript to 6.0.3. The existing Firebase tests use the TypeScript JavaScript API, and the installed typescript-eslint does not support TypeScript 7. Next.js continues to handle production bundling. Clients must support the resulting modern JavaScript.
