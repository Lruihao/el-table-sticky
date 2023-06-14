module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'], // 使用单引号
    'comma-dangle': ['error', 'only-multiline'], // 多行时才可以使用尾随逗号
    semi: ['error', 'never'], // 不要尾随分号
    'vue/max-attributes-per-line': ['error', {
      singleline: 5,
      multiline: 1,
    }], // 属性换行配置
  },
}
