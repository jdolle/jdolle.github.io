import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import merge from 'webpack-merge'
import baseConfig from './webpack.base'

export default merge.strategy({
  module: 'replace',
  plugins: 'replace',
  'output.filename': 'replace',
  'output.path': 'replace'
})(baseConfig, {
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
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true
            }
          }
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
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
    new CleanWebpackPlugin([path.resolve(__dirname, '../build')], {
      root: process.cwd()
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new HtmlWebpackPlugin({
      title: 'Hello, I\'m Jeff Dolle',
      template: 'src/index.template.ejs',
      inject: 'body'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      files: ['./src/**/*.scss']
    }),
    new ExtractTextPlugin('[name].scss')
  ],
  devtool: 'source-map',
  output: {
    filename: '[name].prod.bundle.js',
    path: path.resolve(__dirname, '../build'),
  }
})
