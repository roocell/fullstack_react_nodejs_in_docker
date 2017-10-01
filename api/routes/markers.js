var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  var key = 'markers';
  var a = []; // use array to push into 
  var o = {}; // object

  var data = {
    id: 'marker1',
    lat: '45.3427596',
    lon: '-75.7690188'
  };
  var data2 = {
    id: 'marker2',
    lat: '45.3426088',
    lon: '-75.7677689'
  };
  var data3 = {
    id: 'marker3',
    lat: '45.3418019',
    lon: '-75.7677314'
  };

  a.push(data);
  a.push(data2);
  a.push(data3);


  res.json(a);
  // the client end doesn't work with stringify
  // which produces a bunch of quotes and escape sequences
  //res.json(Object.assign({}, a));

});

module.exports = router;
var o = {} // empty Object
