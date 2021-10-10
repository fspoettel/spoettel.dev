module.exports = {
  extends: [
    'eslint:recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  plugins: [],
  rules: {
    'no-undef': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};