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

app.get('/water_ripple', function (req, res) {

  /* Alternatively you could loop through the records with a "for"
  	for (let i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
  */
  //  res.sendFile('./public/index.html');
});

// app.listen(80, function () {
//   console.log('Example app listening on port 80!')
// });

let httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(80);

// module.exports = app;