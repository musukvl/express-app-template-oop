"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
//var SiteUserMiddleware = require("./middleware/SiteUserMiddleware");
var ApiMiddleware = require("./middleware/ApiMiddleware");

class AppBuilder {

    constructor(config, appEnv) {
        this._config = config;
        this._appEnv = appEnv;
        this._app = express();
        this.buildApp();
    }

    setRoutes(routes) {
        var self = this;
        self._app.use('/', routes);

        // catch 404 and forward to error handler
        self._app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handlers

        // development error handler
        // will print stacktrace
        if (self._app.get('env') === 'dev') {
            self._app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                self._appEnv.logger().error('Request exception', err);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        } else {
            // production error handler
            // no stacktraces leaked to user
            self._app.use(function (err, req, res, next) {
                self._appEnv.logger().error('Request exception', err);
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            });
        }
    }

    get app() {
        return this._app;
    }

    buildApp(){
        this._app.set('appEnv', this._appEnv);
        this._app.use(favicon('static/favicon.ico'));
        this._app.use(logger('dev'));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(cookieParser());
        this._app.use(express.static('static'));

        this.configureAppMiddlewares();

        this.configureViewEngine();

        return this._app;
    }

    configureAppMiddlewares(){

        var apiMiddleware = new ApiMiddleware(this._appEnv);
        this._app.use('/api/*', apiMiddleware.create());

//        var siteUserMiddleware = new SiteUserMiddleware(this._appEnv);
//        this._app.use('/:userId?', siteUserMiddleware.create());
    }

    // view engine setup
    configureViewEngine(){
        this._app.set('views', 'views');
        this._app.use(partials());
        this._app.set('view engine', 'ejs');
        this._app.set('view options', {
            layout: 'layout'
        });
    }
}

module.exports = AppBuilder;
