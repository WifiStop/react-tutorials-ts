// const CracoLessPlugin = require('craco-less')
const path = require('path')

const resolve = pathUrl => path.join(__dirname, pathUrl)
const FastRefreshCracoPlugin = require('craco-fast-refresh')
module.exports = {
  babel: {   
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
 },
 plugins: [{
  plugin: FastRefreshCracoPlugin
}],
  webpack: {

  },
  devServer: {
    port: 3003,
    hot: true
  }
}