const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/app/smartcards",
    publicPath: "/smartcards",
    filename: 'smartcards.min.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.html$/,
        use: [
          "htmllint-loader",
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg)$/i,
        use:[{
          loader: "url-loader",
          options: {
            limit: 20000
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "#inline-source-map",
  devServer: {
    contentBase: "./app",
    hot: true,
    historyApiFallback: false
  }
};
