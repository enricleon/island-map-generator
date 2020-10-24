const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'island-tile-generator.js', // <-- Important
    libraryTarget: 'this', // <-- Important
  },
  target: 'es6', // <-- Important
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: [/node_modules/, /core-js/, /regenerator-runtime/],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [nodeExternals()], // <-- Important
}
