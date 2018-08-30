const path = require('path');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const commonBuild = {
  mode: 'development',
  devtool: 'source-map',
  watchOptions: {
    ignored: ['dev-dist', 'dist']
  }
}

const packageBuild = merge(commonBuild, {
  entry: './src/lib/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    library: '',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: {
          and: [/node_modules/, /src\/lib\/browser\.js/]
        },
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
});

const testBuild = merge(commonBuild, {
  entry: './src/index.js',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, './dev-dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: {
          and: [/node_modules/, /src\/lib/]
        },
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
});

module.exports = [testBuild, packageBuild];
