var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('sound'));
app.use(express.static('js/libs'));
app.use(express.static('js/my_scripts'));

// app.use(express.static('js/scripts'));
// app.use(express.static('js/libs'));

app.get('/forest', function (req, res) {

  /* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
  */
});
// });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

// module.exports = app;