const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/el-table-sticky/' : '/',
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false,
  },
})
