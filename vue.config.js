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
    name: "ajtw-hw",
    themeColor: "#EF5C65",
    manifestCrossorigin: "anonymous",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#777"
    }
  }
};
