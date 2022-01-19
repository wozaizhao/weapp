module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  //全局变量
  globals: {
    __DEV__: true,
    __WECHAT__: true,
    __ALIPAY__: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
