// Dependencies
var mysql = require('mysql');
var propertiesReader = require('properties-reader');

// Getting required properties
var properties = propertiesReader('./resources/properties.ini');

var databaseHost = properties.get('database.host');
var databaseUser = properties.get('database.user');
var databasePassword = properties.get('database.password');

var getDatabaseConnection = function (databaseName) {
    var con;
    if (databaseName) {
        con = mysql.createConnection({
            host: databaseHost,
            user: databaseUser,
            password: databasePassword,
            database: databaseName
        });
    } else {
        con = mysql.createConnection({
            host: databaseHost,
            user: databaseUser,
            password: databasePassword
        });
    }

    return con;
};

exports.getDatabaseConnection = getDatabaseConnection;