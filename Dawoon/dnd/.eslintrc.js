module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-extraneous-dependencies': 0,
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
  },
};
