
// https://github.com/mysqljs/mysql
//var mysql = require('mysql');

module.exports = {
  info: function() {
    var credentials = {
      host     : 'mysql', // from the --link option in docker
      user     : 'dbuser',
      password : 'admin123',
      database : 'teleport'
    };
    return credentials;
  }

};
