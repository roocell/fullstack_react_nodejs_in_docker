var express = require('express');
var router = express.Router();
var db = require('./db');
var mysql = require('mysql');

// test post by command line - this will be similar to what we'll send from the ios app
// curl -d '{"action":"register", "userid":"abc123"}' -H "Content-Type: application/json" http://192.168.99.100:3001/users

// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

const registerUser = async (userid) => {
  var response = {status: "fail"};
  var connection = mysql.createConnection(db.info());
  connection.connect();

  try {
    var query = "INSERT INTO users (userid) VALUES ('" + userid +"') ";
    console.log(query);
    var results = await connection.query(query);
    response = {status: "pass", reason: "added"};
    return response;
  } catch (err) {
    console.log(err);
    response = {status: "fail", reason: "db_error2"};
  }
  return response;
}

const checkUserExists = async (userid) => {
  var response = {status: "fail"};
  var connection = mysql.createConnection(db.info());
  connection.connect();

  try {
    var query = "SELECT COUNT(*) as count FROM users WHERE userid = '" + userid + "' ";
    console.log(query);
    var results = await connection.query(query);
    console.log(results);
    if (results[0].count > 0)
    {
      console.log("you exist");
      response = {status: "pass", reason: "exists"};
    }
    return response;
  } catch (err) {
    response = {status: "fail", reason: "db_error1"};
  }
  return response;
}

const checkAndRegisterUser = async (userid) => {
  var response = await checkUserExists(userid);
  if (response.reason == "exists")
  {
    return response;
  }
  return await registerUser(userid);
}

router.post('/', async function(req, res) {
   var response = {status: "fail"};
   console.log(req.body);
   switch(req.body.action)
   {
     case "register":
       response = await checkAndRegisterUser(req.body.userid);
       break;
     default:
       console.log("/users, unhandled action" + req.body.action);
       response = {status: "fail", reason: "unhandled action"};
   }
   res.json(response);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.warn("mike");

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "pZGGGFp"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

module.exports = router;
