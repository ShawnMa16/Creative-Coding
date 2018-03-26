var express = require('express');

var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/water_ripple', function (req, res) {

  /* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
  */
});
// });

app.listen(3080, function () {
  console.log('Example app listening on port 3080!')
});

// module.exports = app;