module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'jest'],
  rules: {
    semi: ['error', 'always'],
    'no-console': 'off'
  }
};
