import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// bootstrap
require('bootstrap-loader');

// front awesome webpack sass
require('font-awesome-webpack-sass');

const json = require('./resume.json');

// react dom 
// render
// app
// json obj
// {json}
// document
// get element by id
// root
ReactDOM.render(
  <App jsonObj={json} />,
  document.getElementById('root')
);

