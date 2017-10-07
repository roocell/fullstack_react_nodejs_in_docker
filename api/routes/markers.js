var express = require('express');
var router = express.Router();

// https://github.com/mysqljs/mysql
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection({
    host     : 'mysql', // from the --link option in docker
    user     : 'dbuser',
    password : 'admin123',
    database : 'teleport'
  });

  connection.connect();

  connection.query('SELECT * FROM markers WHERE 1', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();  

});

module.exports = router;
