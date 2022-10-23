const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /\/node_modules$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: `fonts/`,
          publicPath: `../fonts/`,
        },
      },
    ],
  },
  {
    test: /\.mp3$/,
    exclude: /\/node_modules$/,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath: `sounds/`,
      publicPath: `../sounds/`,
    },
  },
  {
    test: /\.(jpg|png|svg|gif)$/i,
    exclude: /\/node_modules$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 8000,
        name: "[name].[ext]",
        outputPath: `assets/`,
        publicPath: `../assets/`,
      },
    },
  },
  {
    test: /\.(ts|js|jsx)$/i,
    exclude: /\/node_modules$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["@babel/plugin-proposal-class-properties"],
        compact: true,
      },
    },
  },
  {
    test: /\.(sa|sc|c)ss$/i,
    exclude: /\/node_modules$/,
    use: [miniCssExtractPlugin.loader, "css-loader"],
  },
];
