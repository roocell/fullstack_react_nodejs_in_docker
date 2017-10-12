
// https://github.com/mysqljs/mysql
//var mysql = require('mysql');

// Promisify mysql so we can use Promises instead of callbacks
// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

// can also use Promisify (which is part of nodejs in 2015)
// https://codeburst.io/quick-dig-promisify-in-node-js-6d5d763f847d

const mysql = require( 'mysql' );
module.exports = class Database {
    constructor( ) {
      var config = {
        host     : 'mysql', // from the --link option in docker
        user     : 'dbuser',
        password : 'admin123',
        database : 'teleport'
      };
      this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
