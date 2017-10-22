/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ReapopReduxAxiosMiddleware',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new PeerDepsExternalsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      }
    ]
  }
};
