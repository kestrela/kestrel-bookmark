module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 打包配置，解决页面空白の配置方案。
  devServer: {
    port: 8080,
    proxy: {
      // 配置前端代理转发地址
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
