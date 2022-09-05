const { CracoAliasPlugin } = require('react-app-alias')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CompressionWebpackPlugin(), 
        new BrotliWebpackPlugin(),
      ]
    }
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {}
    }
  ]
};