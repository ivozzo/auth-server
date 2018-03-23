// Dependencies
var connectionManager = require('../lib/db-functions.js');
var propertiesReader = require('properties-reader');
var md5 = require('md5');

// Properties reading
var properties = propertiesReader('./resources/properties.ini');
var databaseName = properties.get('database.name');
var databaseUserTable = properties.get('database.user.table');
var databaseGrantTable = properties.get('database.grant.table');
var mainUser = properties.get('general.username');
var mainPassword = properties.get('general.password');
var secret_key = properties.get('database.secret');

function createTables(connection) {

    var sql = `CREATE TABLE IF NOT EXISTS ${databaseUserTable} 
    (id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        name VARCHAR(255), 
        role VARCHAR(255), 
        user VARCHAR(255), 
        passwd VARCHAR(255))`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table ${databaseUserTable} OK`);
    });

    var sql = `CREATE TABLE IF NOT EXISTS ${databaseGrantTable} 
    (id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        user INTEGER,
        FOREIGN KEY (user) REFERENCES ${databaseUserTable}(id) ON DELETE CASCADE, 
        has_admin_rights TINYINT(1),
        can_add_user TINYINT(1), 
        can_delete_user TINYINT(1),
        can_update_user TINYINT(1), 
        can_add_survey TINYINT(1),
        can_add_tracking TINYINT(1),
        can_add_follow_up TINYINT(1),
        can_add_sky_region TINYINT(1))`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table ${databaseGrantTable} OK`);
    });
}

function createMainUser(connection) {

    var sql = `INSERT IGNORE INTO ${databaseUserTable} 
    (id, name, role, user, passwd) 
    VALUES 
    (1, 'Administrator', 'Administrator', '${mainUser}', '${md5(mainPassword)}')`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Main user OK`);
    });

    var sql = `INSERT IGNORE INTO ${databaseGrantTable} 
    (id, user, has_admin_rights, can_add_user, can_delete_user, can_update_user, can_add_survey, can_add_tracking, can_add_follow_up, can_add_sky_region)
    VALUES
    (1, 1, 1, 1, 1, 1, 1, 1, 1, 1)`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Main user grants OK`);
    });
}

var connection = connectionManager.getDatabaseConnection(databaseName);
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to dabatase ${databaseName}`);
});
console.log(`Checking for tables existance`)
createTables(connection);
console.log(`Checking for main user existance`)
createMainUser(connection);
connection.end();