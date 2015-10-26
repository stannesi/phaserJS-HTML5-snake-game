// setup

// import express
var express = require('express');
// create our app with express
var app = express();
// path
var path = require('path');
// port
var port = 8080;

// set the static files location /public/img will be /img for users
app.use(express.static(path.resolve(__dirname, '..')));

// get application
app.get('*', function(req, res) {
    // load the index page
    res.sendfile(path.resolve(__dirname, '../index.html'));
});

// listen (start app with node server.js)
app.listen(port);
console.log('App listening on port %s', port);