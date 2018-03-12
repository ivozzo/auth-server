// Dependencies
var express = require('express');
var jwt = require('jsonwebtoken');
var propertiesReader = require('properties-reader');
var md5 = require('md5');
var database = require('../lib/db.js');

// Apps
var app = express();

// Properties reading
var properties = propertiesReader('./Resources/properties.ini');
var port = properties.get('general.port');
var secret = properties.get('token.secret');
var ttl = properties.get('token.ttl');
var secret_key = properties.get('database.secret');

// Register the home route that displays a welcome message
app.get('/', function (req, res) {
    res.status(200).send("Authorization Server");
})

// Register the route to get a new token
app.get('/token', function (req, res) {

    if (req.query.username && req.query.password) {
        var username = req.query.username;
        var password = md5(req.query.password);

        database.getUser(username, function (user) {
            if (user && user.length > 0) {
                if (user[0].passwd.trim() === password.trim()) {
                    var token = jwt.sign({
                        username: username
                    }, secret, {
                        expiresIn: ttl
                    });
                    res.status(200).send(token)
                } else {
                    res.status(401).send("User not authorized")
                }
            } else {
                res.status(404).send("User not found")
            }
        });
    } else {
        res.status(400).send("No username and password provided")
    }
})

// Register a route that requires a valid token to view data
app.get('/verify', function (req, res) {
    var token = req.query.token;

    verifyToken(token, function (err) {
        if (!err) {
            res.status(200).send("Authorized")
        } else {
            res.status(401).send("Unauthorized");
        }
    });
})

function verifyToken(token, callback) {
    jwt.verify(token, secret, function (err, decoded) {
        if (!err) {
            return callback(null);
        } else {
            return callback(err);
        }
    });
}

// Launch Auth server
app.listen(port);