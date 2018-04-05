let https = require('https');
let fs = require('fs'); // Using the filesystem module

let credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/xiaoma.space/cert.pem')
};

let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(express.static('js/my_scripts'));
app.use(express.static('js/libs'));
app.use(express.static('sound'));
app.use(express.static('assests'));

app.get('/forest', function (req, res) {
  res.sendfile(__dirname + '/public/tree.html');
});

app.get('/about', function (req, res) {
  res.sendfile(__dirname + '/public/about.html');
});

let httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);

// module.exports = app;