// import express
var express = require('express');
// filestream
var fs = require('fs');
// path
var path = require('path');
// port
var PORT = process.env.PORT || 8000;

var deploy_dir = path.resolve(__dirname, './deploy/index.html');

express()
  .use(express.static(path.resolve(__dirname, './deploy/js')))
  .use(start)
  // listen (start app with node server.js)
  .listen(PORT, onListen);

function start(req, res, next) {
  res.sendFile(deploy_dir);
}

function onListen() {
  console.log('app listening on port %s', PORT);
}
