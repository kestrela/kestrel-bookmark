module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 打包配置，解决页面空白の配置方案。
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.zhanhongzhu.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
