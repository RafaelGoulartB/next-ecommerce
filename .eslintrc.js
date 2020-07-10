module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'plugin:react/recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    quotes: ['error', 'single'],
  },
};
