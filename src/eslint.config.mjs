import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'] },
  ...nextVitals,
  // Keep the pre-upgrade React 18 lint behavior; React Compiler is not enabled.
  // Compiler adoption and the existing UI patterns require a separate refactor.
  { rules: {
    'react-hooks/immutability': 'off',
    'react-hooks/purity': 'off',
    'react-hooks/set-state-in-effect': 'off',
  } },
];
export default config;
