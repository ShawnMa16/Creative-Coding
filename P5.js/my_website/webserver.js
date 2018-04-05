let https = require('https');
let fs = require('fs'); // Using the filesystem module

let credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/cert.pem')
};

let express = require('express');
let app = express();

app.use(express.static('html'));
app.use(express.static('js/libs'));
app.use(express.static('js/my_scripts'));
app.use(express.static('js/libs/p5js'));
app.use(express.static('js/libs/brf_asmjs'));
app.use(express.static('js/libs/brf_wasm'));
app.use(express.static('js/libs/createjs'));
app.use(express.static('js/libs/highlight'));
app.use(express.static('js/libs/quicksettings'));
app.use(express.static('js/libs/threejs'));
app.use(express.static('sound'));
app.use(express.static('assests'));
app.use(express.static('css'));

app.get('/forest', function (req, res) {
  res.sendfile(__dirname + '/html/forest.html');
});

app.get('/about', function (req, res) {
  res.sendfile(__dirname + '/html/about.html');
});

app.get('/face', function (req, res) {
  res.sendfile(__dirname + '/html/face.html');
});

let httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);

// module.exports = app;