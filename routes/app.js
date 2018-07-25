const propertiesReader = require('properties-reader');
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const database = require('../lib/db');
const jwt = require('jsonwebtoken');

// Properties reading
const properties = propertiesReader('./resources/properties.ini');
const secret = properties.get('token.secret');
const ttl = properties.get('token.ttl');

// Register the home route that displays a welcome message
router.get('/', function (req, res) {
    res.status(200).send("Authorization Server");
});

// Register the route to get a new token
router.get('/token', function (req, res) {

    if (req.query.username && req.query.password) {
        const username = req.query.username;
        const password = md5(req.query.password);

        database.getUser(username, function (user) {
            if (user && user.length > 0) {
                if (user[0].passwd.trim() === password.trim()) {
                    var token = jwt.sign({
                        username: username
                    }, secret, {
                        expiresIn: ttl
                    });
                    // res.cookie('NICO-AuthDomain', token, { domain: 'nico.com', path: '/token', secure: true }).status(200).send('User authorized');
                    res.cookie('NICO-AuthDomain', token, {path: '/token', secure: true}).status(200).send('User authorized');
                } else {
                    res.status(401).send("User not authorized");
                }
            } else {
                res.status(404).send("User not found")
            }
        });
    } else {
        res.status(400).send("No username and password provided")
    }
});

// Register a route that requires a valid token to view data
router.get('/verify', function (req, res) {
    const token = req.query.token;

    verifyToken(token, function (err) {
        if (!err) {
            res.status(200).send("Authorized");
        } else {
            res.status(401).send("Unauthorized");
        }
    });
});

function verifyToken(token, callback) {
    jwt.verify(token, secret, function (err, decoded) {
        if (!err) {
            return callback(null);
        } else {
            return callback(err);
        }
    });
}
module.exports = router;