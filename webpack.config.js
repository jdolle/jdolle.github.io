const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: PRODUCTION ? ['babel-polyfill', './src/index.jsx'] : [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.jsx',
    './src/index.scss'
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      // ----------- JSX -----------
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              failOnError: true
            }
          }
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },

      // ----------- CSS -----------
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader'
            // options: {
            //   modules: true,
            //   sourceMap: true
            // }
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'src')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: PRODUCTION ? [
    new CleanWebpackPlugin(['build']),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new HtmlWebpackPlugin({
      title: 'Hello, I\'m Jeff Dolle'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] :
  [
    new CleanWebpackPlugin(['dist']),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.LoaderOptionsPlugin({
      debug: PRODUCTION ? false : true
    }),
    new HtmlWebpackPlugin({
      title: 'Hello, I\'m Jeff Dolle',
      template: 'src/index.template.ejs',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: PRODUCTION ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
