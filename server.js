const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(8080, 'localhost', err => {
  if (err) {
    return console.log(err);
  }

  return console.log('Listening at http://localhost:8080/');
});
