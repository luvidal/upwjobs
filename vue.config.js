module.exports = {
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        timers:false
      }
    }
  }
};