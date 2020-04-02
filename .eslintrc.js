module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: [
    'react',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      "jsx": true,
    }
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
  },
};
