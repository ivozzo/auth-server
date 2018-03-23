var app = require('../app');
var propertiesReader = require('properties-reader');
var http = require('http');

// Properties reading
var properties = propertiesReader('./Resources/properties.ini');
var port = properties.get('general.port');
var secret = properties.get('token.secret');
var ttl = properties.get('token.ttl');
var secret_key = properties.get('database.secret');

// Create server
var server = http.createServer(app);

// Listen on specified port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}