module.exports = {
  publicPath: "",

  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        return options;
      });
  },

  pwa: {
    name: 'ajtw-hw',
    themeColor: '#EF5C65',
    manifestCrossorigin: 'anonymous',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  }
};
