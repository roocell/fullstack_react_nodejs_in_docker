var express = require('express');
var router = express.Router();
var db = require('./db');
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(db.info());
  connection.connect();

  connection.query('SELECT * FROM markers WHERE 1', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();

});

module.exports = router;
