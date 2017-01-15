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

// Fallback to index.html for applications that are using the HTML 5 history API
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


// from paths
// Warn and crash if required files are missing.............
// paths.appHtml === public/index.html
// paths.appIndexJs === ./src/index.js
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}


// Tools like Cloud9 rely on this.
// port 3000 or ...
var DEFAULT_PORT = process.env.PORT || 3000;

var compiler;


var handleCompile;

// smoke test means test most of the func
// You can safely remove this after ejecting.
// We only use this block for testing of Create React App itself:

// smoke test means test most of the func
// process argv
// some
// arg => xxx > -1
// arg.index('--somke-test')
var isSmokeTest = process.argv.some(arg => arg.indexOf('--smoke-test') > -1);
if (isSmokeTest) {
  // handle compiel is a func
  // err status
  handleCompile = function (err, stats) {
    // err
    // stats has error
    // stats has warning
    if (err || stats.hasErrors() || stats.hasWarnings()) {
      // process exit
      // exit 1
      process.exit(1);
    } else {
      // exit 0
      process.exit(0);
    }
  };
}


function setupCompiler(host, port, protocol) {

  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  
  // webpack
  // config === ../config/webpack.config.dev.js
  // handleCompile is exit fi error
  compiler = webpack(config, handleCompile);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', function() {
    // clear the screen then print
    clearConsole();
    console.log('Compiling...');
  });


  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  // when webpack done compile, we have a callback
  compiler.plugin('done', function(stats) {
    // clear console
    clearConsole();

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
      console.log();
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}


// on proxy error for http proxy middleware
// We need to provide a custom onError function for httpProxyMiddleware.
// It allows us to log custom error messages on the console.
function onProxyError(proxy) {
  // return
  // func
  // err, req, res
  return function(err, req, res){
    // host
    // req headers
    // req headers.host
    var host = req.headers && req.headers.host;
    
    // url, host, proxy
    // console.log
    // chalk.red
    // chalk.cyan
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    
    //chalk.red
    // error.code
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    );
    
    // empty
    console.log();

    // res write head, yes
    // res headers not sent
    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
        // res
        // write head, write header
        // 500
        res.writeHead(500);
    }
    
    // res end
    // req.url
    // host
    // proxy
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    );
  }
}


// func add middle ware
function addMiddleware(devServer) {
  // proxy
  // require
  // app packagejson is package.json
  // `proxy` lets you to specify a fallback server during development.
  // Every unrecognized request will be forwarded to it.
  var proxy = require(paths.appPackageJson).proxy;

  // dev server passed as param
  // history api fall back, which is 
  // server use history_api_fall_back, which refresh still back to that page.
  devServer.use(historyApiFallback({
    // disable dot rule
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
    
    
    // 
    // For single page apps, we generally want to fallback to /index.html.
    // However we also want to respect `proxy` for API calls.
    // So if `proxy` is specified, we need to decide which fallback to use.
    // We use a heuristic: if request `accept`s text/html, we pick /index.html.
    // Modern browsers include text/html into `accept` header when navigating.
    // However API calls like `fetch()` won’t generally accept text/html.
    // If this heuristic doesn’t work well for you, don’t use `proxy`.
    
    // html accept headers proxy
    // text/html
    // text/html
    // */*
    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*']
  }));
  
  
  // proxy
  if (proxy) {
    // type of proxy
    // stirng, proxy needs to be string
    if (typeof proxy !== 'string') {
      console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
      console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
      console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
      process.exit(1);
    }

    //
    // Otherwise, if proxy is specified, we will let it handle any request.
    // There are a few exceptions which we won't send to the proxy:
    // - /index.html (served as HTML5 history API fallback)
    // - /*.hot-update.json (WebpackDevServer uses this too for hot reloading)
    // - /sockjs-node/* (WebpackDevServer uses this for hot reloading)
    // Tip: use https://jex.im/regulex/ to visualize the regex
    
    // basically index.html, hot-update or sockjs-node
    var mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
    
    // dev server use
    // may proxy
    devServer.use(mayProxy,
    
      // http proxy middle ware
      // pathname => xxxxx
      // mayproxy
      // .test
      // pathname
      // Pass the scope regex both to Express and to the middleware for proxying
      // of both HTTP and WebSockets to work without false positives.
      httpProxyMiddleware(pathname => mayProxy.test(pathname), {
        // target proxy
        target: proxy,
        // log level, silent
        logLevel: 'silent',
        // on error
        onError: onProxyError(proxy),
        // secure false
        secure: false,
        
        // change origin, true
        changeOrigin: true
      })
    );
  }
  
  // dev server middle ware
  // use 
  // Finally, by now we have certainly resolved the URL.
  // It may be /index.html, so let the dev server try serving it again.
  devServer.use(devServer.middleware);
}


// func run dev server
// host
// port
// protocol
function runDevServer(host, port, protocol) {
  // dev server
  // web pack dev server
  // compiler
  var devServer = new WebpackDevServer(compiler, {
    // client log no
    
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_PATH%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    
    // content base is like the build dir
    contentBase: paths.appPublic,
    
    // hot reload
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    
    // like /assets dir
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    
    // quiet
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    
    // ignore node_modules
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    },
    
    // https
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === "https",
    
    // host
    host: host
  });
  
  // add middle ware dev server
  // Our custom middleware proxies requests to /index.html or a remote API.
  addMiddleware(devServer);

  // dev server listen
  // port
  // err, result
  // Launch WebpackDevServer.
  devServer.listen(port, (err, result) => {
    // err
    if (err) {
      // return
      return console.log(err);
    }

    // console
    clearConsole();
    
    // start
    console.log(chalk.cyan('Starting the development server...'));
    
    console.log();
    
    // open
    openBrowser(protocol + '://' + host + ':' + port + '/');
    
  });
}


// run
function run(port) {
  // https or http
  var protocol = process.env.HTTPS === 'true' ? "https" : "http";
  // localhost
  var host = process.env.HOST || 'localhost';
  
  // set up compiler to listen
  setupCompiler(host, port, protocol);
  
  // web pack server
  runDevServer(host, port, protocol);
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.




// ----------------------------- actual run ----------------
// detect port
// then
// port => {}
detect(DEFAULT_PORT).then(port => {
  // if port ======== 3000
  if (port === DEFAULT_PORT) {
    // run another port
    run(port);
    return;
  }

  // clear
  clearConsole();

  // question
  // chalk, yellow
  // question
  var question =
    chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.') +
    '\n\nWould you like to run the app on another port instead?';

  // you can do some action
  // if shouldChangePort true or false
  prompt(question, true).then(shouldChangePort => {
    // true
    if (shouldChangePort) {
      // another port
      run(port);
    }
  });
});
