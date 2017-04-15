"use strict";
var ViewModelBase = require("../core.web/ViewModelBase");
var BaseController = require("./BaseController");
var Promise = require('bluebird');
var co = Promise.coroutine;

class MainController extends BaseController {

    constructor(env) {
        super(env);
    }

    index() {
        var self = this;
        return (req, res, next) => {
            co(function*() {
                var viewModel = new ViewModelBase(req, {layout: 'layout', title: "123"});
                res.render('index', viewModel);
            })();
        };
    }
}

module.exports = MainController;