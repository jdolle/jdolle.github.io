import path from 'path'

export default {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/index.jsx'),
    path.resolve(__dirname, '../src/index.scss')
  ],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, '../src/core/components'),
      'routes': path.resolve(__dirname, '../src/core/routes')
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, '../node_modules')
    ]
  },
  module: {},
  plugins: [],
  target: 'web',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
}
