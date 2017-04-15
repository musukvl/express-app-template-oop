"use strict";

var express = require('express');

var Promise = require('bluebird');
var co = Promise.coroutine;
var MainController = require('../controllers/MainController');
var ApiController = require('../controllers/ApiController');

class RouteFactory {

    constructor(env) {
        this._env = env;
    }

    init() {
        var router = express.Router();

        var apiController = new ApiController(this._env);
        router.all('/api/test',  apiController.test());


        var mainController = new MainController(this._env);
        router.get(['/'], mainController.index());

        return router;
    }
}

module.exports = RouteFactory;
