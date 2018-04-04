var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');

httpServer.listen(3000);

function requestHandler(req, res) {

  var parsedUrl = url.parse(req.url);
  console.log("The Request is: " + parsedUrl.pathname);

  fs.readFile(__dirname + parsedUrl.pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + parsedUrl.pathname);
      }
      res.writeHead(200);
      res.end(data);
      }
    );
}
