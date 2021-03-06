// Dependencies
var connectionManager = require('../lib/db-functions.js');
var propertiesReader = require('properties-reader');

// Properties reading
var properties = propertiesReader('./Resources/properties.ini');
var databaseName = properties.get('database.name');
var databaseUserTable = properties.get('database.user.table');

var getUsers = function () {
    var connection = connectionManager.getDatabaseConnection(databaseName);

    connection.connect(function (err) {
        if (err) throw err;
        console.log(`Retrieving user list`);
    });

    var sql = `SELECT * FROM ${databaseUserTable}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        return result;
    });
}

var getUser = function (username, callback) {
    var connection = connectionManager.getDatabaseConnection(databaseName);

    connection.connect(function (err) {
        if (err) throw err;
        console.log(`Retrieving user info`);
    });

    var sql = `SELECT passwd FROM ${databaseUserTable} WHERE user='${username}'`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

exports.getUsers = getUsers;
exports.getUser = getUser;