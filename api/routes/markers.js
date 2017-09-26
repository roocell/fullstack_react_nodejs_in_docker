var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  var key = 'markers';
  var a = [{"id":"000000", "lat":"0.000"}]; // use array to push into 
  var o = {}; // object

  var data = {
    id: 'R44444444446',
    lat: '76.36731'
  };
  var data2 = {
    id: '1544445510296',
    lat: '99.15431'
  };
  a.push(data);
  a.push(data2);


  res.json(a);
  // the client end doesn't work with stringify
  // which produces a bunch of quotes and escape sequences
  //res.json(Object.assign({}, a));

});

module.exports = router;
var o = {} // empty Object
