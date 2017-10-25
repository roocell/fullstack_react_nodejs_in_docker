var express = require('express');
var router = express.Router();
const Database = require('./db');
const Apns = require('./apns/apns');

// test post by command line - this will be similar to what we'll send from the ios app
// curl -d '{"action":"register", "userid":"abc123"}' -H "Content-Type: application/json" http://192.168.99.100:3001/users

const checkAndRegisterUser = async (data) => {
  var database = new Database();
  var response = {status: "fail2"};

  var query = "SELECT COUNT(*) as count FROM users WHERE userid = '" + data.userid + "' ";
  await database.query(query)  // need to await here so the return at the end of the func wait for all this to happen
  .then( rows => {
    // do something with the result
    //console.log(rows);
    if (rows[0].count > 0)
    {
      console.log("you exist");

      // always update notiftoken
      var query = "UPDATE users SET notiftoken='"+data.notiftoken+"' WHERE  userid = '" + data.userid + "'";
      database.query(query);
      response = {status: "pass", reason: "exists"};
    } else {
      console.log("inserting");
      var query = "INSERT INTO users (userid, ios, notiftoken) VALUES ('" + data.userid +"','"+data.ios+"','"+data.notiftoken+"') ";
      return database.query(query);
    }
  }, err => {
    console.log("err1");
    response = {status: "pass", reason: "db_err_select"};
    return database.close().then( () => { throw err; } )
  })
  .then( rows => {
    console.log("second");
    if (response.reason != "exists")
    {
      response = {status: "pass", reason: "added"};
    }
    return database.close();
  }, err => {
    console.log("err2");
    response = {status: "pass", reason: "db_err_insert"};
    return database.close().then( () => { throw err; } )
  })
  .catch( err => {
          // handle the error
  } )

  return response;
}

const getTokenFromUserId = async (userid) => {
  var database = new Database();

  var query = "SELECT notiftoken FROM users WHERE userid = '" + userid + "' ";
  //console.log(query);
  var notiftoken = await database.query(query)  // need to await here so the return at the end of the func wait for all this to happen
  .then( rows => {
    // do something with the result
    //console.log(rows);
    return (
      rows[0].notiftoken
    );
  }, err => {
    console.log("err1");
  })
  .catch( err => {
          // handle the error
  } )

  return notiftoken;
}


router.post('/', async function(req, res) {
   var response = {status: "fail"};
   console.log(req.body);
   switch(req.body.action)
   {
     case "register":
       response = await checkAndRegisterUser(req.body);
       break;
     case "pinguser":
       // get notiftoken from userid
       var dest_userid = req.body.dest_userid;
       var src_userid = req.body.src_userid;
       var notiftoken = await getTokenFromUserId(dest_userid);

       var apns = new Apns();
       await apns.sendPushNotification({
         notiftoken: notiftoken,
         message: "Hi. <Snap!>",
         source_userid: src_userid
       });
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

  // TODO: notiftoken should not be returned to the app - this should only be known by the server

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
