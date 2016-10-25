const path = require('path');

const config = {
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: path.join(__dirname, '../node_modules/')
      }
    ]
  },
  target: 'node',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: './dist',
    filename: 'index.js',
    library: true,
    libraryTarget: 'commonjs2'
  }
};

module.exports = config;
