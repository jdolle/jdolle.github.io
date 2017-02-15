import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.base'

export default merge.strategy({
  externals: 'replace',
  module: 'replace',
  plugins: 'replace',
  target: 'replace',
  'output.filename': 'replace'
})(baseConfig, {
  externals: [nodeExternals()],
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
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      files: ['./src/**/*.scss']
    }),
    new ExtractTextPlugin('[name].scss')
  ],
  target: 'node',
  output: {
    filename: '[name].test.bundle.js'
  }
})
