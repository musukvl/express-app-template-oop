"use strict";
var debug = require('debug')('everylistner:server');
var http = require('http');
var Promise = require('bluebird');
var co = Promise.coroutine;

var EnvBuilder = require('./core.web/EnvBuilder');
var RouteFactory = require('./routes/RouteFactory');
var AppBuilder = require('./core.web/AppBuilder');

class ServerBuilder {

    constructor(config, appEnv) {
        this._config = config;
        this._server = {};
        this._appEnv = appEnv;
    }

    build() {
        var self = this;
        co(function*() {
            //environment
            if (!self._appEnv) {
                var builder = new EnvBuilder(self._config);
                self._appEnv = yield builder.build();
            }
            var appBuilder = new AppBuilder(self._config, self._appEnv);

            // routes
            var routeFactory = new RouteFactory(self._appEnv);
            var routes = routeFactory.init();
            appBuilder.setRoutes(routes);


            //run server
            var port = self.normalizePort(process.env.PORT || self._config.get('app-port'));
            appBuilder.app.set('port', port);

            self._server = http.createServer(appBuilder.app);
            self._server.listen(port);
            self._server.on('error', self.onError);
            self._server.on('listening', self.onListening);

        })();
    }

    normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
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

    onListening() {
        var self = this;
        return function() {
            var addr = self._server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        }
    }
}

module.exports = ServerBuilder;