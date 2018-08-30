const path = require('path');

module.exports = {
  mode: 'production',
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
}
