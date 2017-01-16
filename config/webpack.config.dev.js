// path
var path = require('path');

//-webkit-user-select: none;
//-moz-user-select: none;
//-ms-user-select: none;
//user-select: none;
//
// all become user-select: none
var autoprefixer = require('autoprefixer');

// web pack
var webpack = require('webpack');

// # nyc
// ./node_modules/.cache/nyc
// # ava
// ./node_modules/.cache/ava
// # your-module
// ./node_modules/.cache/your-module
var findCacheDir = require('find-cache-dir');

// basically gen the html 5 template
var HtmlWebpackPlugin = require('html-webpack-plugin');

// force path to case sensitive
// mac is not case sensitive, soft of
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// basically like controller pass var to templte
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// if install new module, rebuild project, but no need to restart server
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

var getClientEnvironment = require('./env');

var paths = require('./paths');


// public path is like build dir, so serve from root
// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';


// like build dir
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = '';

// get env fro public url from ./env
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);


// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {

  // separate modules in dev tol
  // This makes the bundle appear split into separate modules in the devtools.
  // We don't use source maps here because they can be confusing:
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  // You may want 'cheap-module-source-map' instead if you prefer source maps.
  devtool: 'eval',
  
  
  // entry point
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    
    // require
    // resolve
    // react dev util
    // web pack hot client, custom client
    require.resolve('react-dev-utils/webpackHotDevClient'),
    
    // require polyfill
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    
    // src/index.js
    // Finally, this is your app's code:
    paths.appIndexJs
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
  ],
  
  // output
  output: {
    // path app build
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    
    // add comments
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    
    // static/js/bundle.js, fake
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    
    
    // root path "/"
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  
  // webpack resolve
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    
    // paths.nodePaths === builds, public, src, node_modules, etc...
    // fallback, don't use resolve.root, because we always fallback
    fallback: paths.nodePaths,
    
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // .js .jso. jsx
    extensions: ['.js', '.json', '.jsx', ''],
    
    // alias
    // react native for web, android and ios......
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web'
    }
  },

  // module
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    // preloaders
    preLoaders: [
      {
        // test js and jsx, this before babel
        test: /\.(js|jsx)$/,
        // loader es lint
        loader: 'eslint',
        // include ./src
        include: paths.appSrc,
      }
    ],
    // loaders
    loaders: [
      // Process JS with Babel.
      {
        // again test js and jsx
        test: /\.(js|jsx)$/,
        // ./src
        include: paths.appSrc,
        // babel
        loader: 'babel',
        query: {
          // 

          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/react-scripts/
          // directory for faster rebuilds. We use findCacheDir() because of:
          // https://github.com/facebookincubator/create-react-app/issues/483
          cacheDirectory: findCacheDir({
            name: 'react-scripts'
          })
        }
      },
      
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        // test .css
        test: /\.css$/,
        // loader
        // style
        // css
        // ?import_loaders=1
        // postcss
        loader: 'style!css?importLoaders=1!postcss'
      },
      {
        // test .scss
        test: /\.scss$/,
        // style-loader
        // inject into style in css
        // css-loader, resolve css path
        // sass loader
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      
      // test .json
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json'
      },
      
      // test file
      // loader file
      // query
      // name
      // static/media/name.232321434.ext
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        // test media
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        // url
        loader: 'url',
        query: {
          // limit
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  // process
  // func
  // We use PostCSS for autoprefixing only.
  postcss: function() {
    // return []
    return [
      // auto prefixer
      autoprefixer({
        browsers: [
          // 
          '>1%', // 
          'last 4 versions', // last 4 versions for each browser
          'Firefox ESR', // ESR, extentended support release
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  
  // plugins
  plugins: [
    // interpolate html plugin
    // publicUrl empty
    //
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    
    // appHtml === index.html
    // inject <script>
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    
    
    // process.env.node_env === development
    // new
    // webpack
    // define plugin env
    // 
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),
    
    
    // new
    // webpack
    // hot module
    // replacement
    // plugin
    // 
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    
    // print error for case
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    
    // no restart for server
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  
  // ????
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
