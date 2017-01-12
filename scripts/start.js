// process
// env
// node env
// dev
process.env.NODE_ENV = 'development';

// 
// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
// basically DB_HOST=localhost in .env, then use like "host: process.env.DB_HOST"
// slient true, so if .env missing, will never warning.
require('dotenv').config({silent: true});

// terminal with color
var chalk = require('chalk');

// webpack
var webpack = require('webpack');

// server for webpack
var WebpackDevServer = require('webpack-dev-server');

// ......
var historyApiFallback = require('connect-history-api-fallback');

// proxy server it is like the router, protect user, don't know IP
var httpProxyMiddleware = require('http-proxy-middleware');

// able to detect port and later can use another one
var detect = require('detect-port');


// there is something react dev utils
// clear console
var clearConsole = require('react-dev-utils/clearConsole');

// check required files, then process.exit(1)
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

// better format
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// open browser, http port, etc
var openBrowser = require('react-dev-utils/openBrowser');



// ask yes or no
var prompt = require('react-dev-utils/prompt');


// webpack config dev
var config = require('../config/webpack.config.dev');

// path like app html
var paths = require('../config/paths');
