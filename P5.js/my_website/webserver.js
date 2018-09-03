let https = require('https');
let fs = require('fs'); // Using the filesystem module

let credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/cert.pem')
};

let express = require('express');
let app = express();

// express.static(root, [options]);

// app.use(express.static('html'));
// app.use(express.static('js/libs'));
// app.use(express.static('js/my_scripts'));
// app.use(express.static('js/libs/p5js'));
// app.use(express.static('js/libs/brf_asmjs'));
// app.use(express.static('js/libs/brf_wasm'));
// app.use(express.static('js/libs/createjs'));
// app.use(express.static('js/libs/highlight'));
// app.use(express.static('js/libs/quicksettings'));
// app.use(express.static('js/libs/threejs'));
// app.use(express.static('js/libs/matterjs'));
// app.use(express.static('sound'));
// app.use(express.static('assests'));
// app.use(express.static('css'));

app.use(express.static('public'));

app.get('/coding/forest', function (req, res) {
  res.sendfile(__dirname + '/public/html/forest.html');
});

app.get('/about', function (req, res) {
  res.sendfile(__dirname + '/public/html/about.html');
});

app.get('/coding/face', function (req, res) {
  res.sendfile(__dirname + '/public/html/face.html');
});

app.get('/sun', function (req, res) {
  res.sendfile(__dirname + '/public/html/sun.html');
});

app.get('/coding/matrix', function (req, res) {
  res.sendfile(__dirname + '/public/html/matrix.html');
});

app.get('/coding/ripple', function (req, res) {
  res.sendfile(__dirname + '/public/html/ripple.html');
});

app.get('/coding/cloth', function (req, res) {
  res.sendfile(__dirname + '/public/html/cloth.html');
});

app.get('/coding/brick', function (req, res) {
  res.sendfile(__dirname + '/public/html/brick.html');
});

app.get('/coding', function (req, res) {
  res.sendfile(__dirname + '/public/html/creative_coding.html');
});

let httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(220);

// module.exports = app;