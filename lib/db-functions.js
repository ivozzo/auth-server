// Dependencies
const mysql = require('mysql');
const propertiesReader = require('properties-reader');

// Getting required properties
const properties = propertiesReader('./resources/properties.ini');

const databaseHost = properties.get('database.host');
const databaseUser = properties.get('database.user');
const databasePassword = properties.get('database.password');

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