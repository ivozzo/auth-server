// Dependencies
var propertiesReader = require('properties-reader');
var connectionManager = require('../lib/db-functions.js');

// Properties reading
var properties = propertiesReader('./resources/properties.ini');
var databaseHost = properties.get('database.host');
var databaseUser = properties.get('database.user');
var databasePassword = properties.get('database.password');
var databaseName = properties.get('database.name');

function createDatabase(connection) {

    connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, function (err, result) {
        if (err) {
            if (err.code === 'ENOTFOUND'){
                console.error('Cannot connect to database, please check if you can access the database url');
                throw err;
            }
        } else {
            console.log(`Database ${databaseName} OK`);
        }
    });
}

var connection = connectionManager.getDatabaseConnection();

connection.connect(function (err) {
    if (err) {
        if (err.code === 'ENOTFOUND'){
            console.error('Cannot connect to database, please check if you can access the database url');
            throw err;
        }
    } else {
        console.log(`Connected, checking if database ${databaseName} already exists`);
    }
});

createDatabase(connection);

connection.end();