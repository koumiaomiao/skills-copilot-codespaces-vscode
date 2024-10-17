// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments.js');

// Create server
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        pathname = '/index.html';
    }

    // Get file extension
    var extname = path.extname(pathname);
    if (pathname != '/favicon.ico') {
        fs.readFile('static' + pathname, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found!');
            } else {
                var contentType = comments.getMime(extname);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
}).listen(8080, function () {
    console.log('Server is running...');
});