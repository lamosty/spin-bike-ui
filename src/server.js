const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpackConfig = require('../webpack.config');

const PORT = 3000;

const app = new express();
const compiler = webpack(webpackConfig);

app.use(
	webpackDevMiddleware(
		compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		}
	)
);

app.use(webpackHotMiddleware(compiler));

app.use(function(req, res) {
	res.sendFile(__dirname + '/index.html'); // try template tags
});

app.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info('Listening on http://localhost:%s', PORT);
	}
});
