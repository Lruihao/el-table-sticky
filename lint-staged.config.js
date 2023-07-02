module.exports = {
  '*.{js,jsx,vue}': 'vue-cli-service lint',
  'src/views/*.{vue}': [
    'npm run gr',
    'git add',
  ],
}
