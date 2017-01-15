// polyfills what, promise, whatwg-fetch, object-assign
// if type of promise
// undefined
if (typeof Promise === 'undefined') {
  
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  
  // promise
  // lib
  // rejection tracking
  require('promise/lib/rejection-tracking').enable();
  
  // win promise
  // require
  // promise
  // lib
  // es6 extensions.js
  window.Promise = require('promise/lib/es6-extensions.js');
}

// whatwg fetch
// next gen html
// fetch() polyfill for making API calls.
require('whatwg-fetch');

// object 
// assign
// require
// object - assign
// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

