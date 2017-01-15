// 
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

// react app, case insensitive
var REACT_APP = /^REACT_APP_/i;

// func get client env
// public url
function getClientEnvironment(publicUrl) {

  // process env
  // obj
  // keys
  // process.env
  var processEnv = Object
    .keys(process.env)
    // filter
    // key react app regular exp, test individual key
    .filter(key => REACT_APP.test(key))
    // reduce, iterlate all item and becomes one
    // env, key
    .reduce((env, key) => {
      // env key
      // json stringify
      // process.env[key]
      env[key] = JSON.stringify(process.env[key]);
      // return evn
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      // node env
      // json stringify
      // if node_env or dev
      'NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      // public url, json stringify public url
      'PUBLIC_URL': JSON.stringify(publicUrl)
    });
    
  // return process env  
  return {'process.env': processEnv};
}

// module exports
// get client env
module.exports = getClientEnvironment;

