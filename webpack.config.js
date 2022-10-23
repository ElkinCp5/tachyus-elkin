const htmlWebpackPlugin = require("html-webpack-plugin");
const { webpackBaseConfig, htmlWebpackConfigs } = require("./webpack.base");

const webpackConfig = {
  ...webpackBaseConfig,
  devtool: "cheap-module-source-map",
  mode: "production",
  plugins: [
    ...webpackBaseConfig.plugins,
    new htmlWebpackPlugin({
      ...htmlWebpackConfigs,
      xhtml: true,
      hash: false,
      minify: true,
    }),
  ],
};

module.exports = webpackConfig;
