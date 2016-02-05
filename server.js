var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var webpackConfig = require('../webpack.config');
var path = require('path');

var PORT = 3000;

var app = new express();
var compiler = webpack(webpackConfig);

app.use(
	webpackDevMiddleware(
		compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		}
	)
);

app.use(webpackHotMiddleware(compiler));

var pathToPublicFolder = path.join(__dirname, '../', webpackConfig.output.publicPath);

app.use(function(req, res) {
	res.sendFile(pathToPublicFolder + '/index.html');
});

app.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info('Listening on http://localhost:%s', PORT);
	}
});
