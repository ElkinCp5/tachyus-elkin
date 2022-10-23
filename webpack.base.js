const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const rules = require("./webpack.module.rules");
const meta = require("./template/meta");

const output = path.resolve(__dirname, "src/public");

const webpackBaseConfig = {
  target: ["web", "es6"],
  watchOptions: {
    ignored: ["node_modules/**"],
  },
  entry: {
    app: ["./src/app/index.js"],
  },
  output: {
    filename: "js/[name].js",
    path: output,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      automaticNameDelimiter: "-",
      chunks: "all",
    },
  },
  // devServer: {
  //   port: process.env.PORT || 3030,
  // },
  resolve: {
    extensions: [".js", ".ts", ".jsx"],
  },
  module: {
    rules: rules,
  },
  plugins: [
    // new EnvironmentPlugin({
    //   PANEL_ENV: JSON.stringify(process.env.PANEL_ENV),
    //   PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
    //   ABLY_DASHBOARD_API_KEY: JSON.stringify(
    //     process.env.ABLY_DASHBOARD_API_KEY
    //   ),
    // }),
    new miniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

const htmlWebpackConfigs = {
  // favicon: `${pathInput}/public/assets/icon.ico`,
  template: "./template/index.html",
  filename: "index.ejs",
  templateParameters: {
    livereload: "",
  },
  meta: meta,
};

module.exports = { webpackBaseConfig, htmlWebpackConfigs };
