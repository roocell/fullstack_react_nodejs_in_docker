var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  var key = 'Orientation Sensor';
  o[key] = []; // empty Array, which you can push() values into


  var data = {
    id: '1450632410296',
    lat: '76.36731'
  };
  var data2 = {
    id: '1450632410296',
    lat: '78.15431'
  };
  o[key].push(data);
  o[key].push(data2);

  res.json(JSON.stringify(o));
});

module.exports = router;var o = {} // empty Object
