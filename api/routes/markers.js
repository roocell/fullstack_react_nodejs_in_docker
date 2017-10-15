var express = require('express');
var router = express.Router();
const Database = require('./db');



/* GET users listing. */
router.get('/', function(req, res, next) {
  var database = new Database();
  var response = {status: "fail"};

  var query = 'SELECT * FROM markers WHERE 1';
  database.query(query)  // need to await here so the return at the end of the func wait for all this to happen
  .then( rows => {
    res.json(rows);
  })
  .catch( err => {
          // handle the error
  } )
  database.close();
});

module.exports = router;
