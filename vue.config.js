/* const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
 */

module.exports = {
  lintOnSave:false, //关闭语法检查

  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'common': '@/common',
        'assets': '@/assets',
        'api': '@/api',
        'store': '@/store',
        'pages': '@/pages',
      }
    },
  },
}