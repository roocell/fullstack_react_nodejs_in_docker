var express = require('express');
var router = express.Router();
const Database = require('./db');

// test post by command line - this will be similar to what we'll send from the ios app
// curl -d '{"action":"register", "userid":"abc123"}' -H "Content-Type: application/json" http://192.168.99.100:3001/users

const checkAndRegisterUser = async (userid) => {
  var database = new Database();
  var response = {status: "fail2"};

  var query = "SELECT COUNT(*) as count FROM users WHERE userid = '" + userid + "' ";
  await database.query(query)  // need to await here so the return at the end of the func wait for all this to happen
  .then( rows => {
    // do something with the result
    //console.log(rows);
    if (rows[0].count > 0)
    {
      console.log("you exist");
      response = {status: "pass", reason: "exists"};
    } else {
      console.log("inserting");
      var query = "INSERT INTO users (userid) VALUES ('" + userid +"') ";
      return database.query(query);
    }
  }, err => {
    response = {status: "pass", reason: "db_err_select"};
    return database.close().then( () => { throw err; } )
  })
  .then( rows => {
    if (response.reason != "exists")
    {
      response = {status: "pass", reason: "added"};
    }
    return database.close();
  }, err => {
    response = {status: "pass", reason: "db_err_insert"};
    return database.close().then( () => { throw err; } )
  })
  .catch( err => {
          // handle the error
  } )

  return response;
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
   console.log(response);
   res.json(response);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var database = new Database();
  var response = {status: "fail"};

  var query = 'SELECT * FROM users WHERE 1';
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
