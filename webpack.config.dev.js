const htmlWebpackPlugin = require("html-webpack-plugin");
const WebpackLiveReload = require("webpack-livereload-plugin");
const { webpackBaseConfig, htmlWebpackConfigs } = require("./webpack.base");

const webpackConfig = {
  ...webpackBaseConfig,
  devtool: "cheap-module-source-map",
  mode: "development",
  stats: {
    children: true,
  },
  plugins: [
    ...webpackBaseConfig.plugins,
    new htmlWebpackPlugin({
      ...htmlWebpackConfigs,
      templateParameters: {
        livereload: "http://localhost:3131/livereload.js",
      },
      xhtml: false,
      hash: false,
      minify: false,
    }),
    new WebpackLiveReload({
      protocol: "http",
      hostname: "localhost",
      port: 3131,
    }),
  ],
};

module.exports = webpackConfig;
