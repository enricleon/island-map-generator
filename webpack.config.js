const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'index.jsx', // <-- Important
    libraryTarget: 'this', // <-- Important
  },
  target: 'es3', // <-- Important
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [nodeExternals()], // <-- Important
}
