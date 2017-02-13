import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import merge from 'webpack-merge'
import baseConfig from './base'

export default merge.strategy({
  entry: 'prepend',
  module: 'replace',
  plugins: 'replace'
})(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  module: {
    rules: [
      // --------- img ----------
      {
        test: /\.(pdf|png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 8192,
          //   }
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },

      // ----------- JSX -----------
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          { loader: 'eslint-loader' }
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' }
        ]
      },

      // ----------- CSS -----------
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, '../src')
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new HtmlWebpackPlugin({
      title: 'Hello, I\'m Jeff Dolle',
      template: path.resolve(__dirname, '../src/index.template.ejs'),
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, '../.stylelintrc.json')
    }),
    new ExtractTextPlugin('[name].scss')
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist')
  }
})
