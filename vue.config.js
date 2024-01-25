const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/el-table-sticky/' : '/',
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: {
        name: 'el-table-sticky',
        type: 'umd',
      }
    }
  },
  css: {
    extract: false,
  },
})
