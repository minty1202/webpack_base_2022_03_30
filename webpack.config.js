const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: { 
    index: path.join(__dirname, 'src', 'js', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i, 
        // 使用するローダーの指定（後ろから順番に適用される）
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ], 
      },
    ],
  },
  //プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css" 
    }),
    new CopyPlugin({ // webpackのentryファイルからロードされないけど必要なファイルを出力
      patterns: [
        {
          context: path.resolve(__dirname, "src"),
          from: "**/*.html",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
}