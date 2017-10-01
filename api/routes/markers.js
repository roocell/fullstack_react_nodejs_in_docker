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
    title: 'marker1',
    lat: 45.3427596,
    lng: -75.7690188
  };
  var data2 = {
    title: 'marker2',
    lat: 45.3426088,
    lng: -75.7677689
  };
  var data3 = {
    title: 'marker3',
    lat: 45.3418019,
    lng: -75.7677314
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
