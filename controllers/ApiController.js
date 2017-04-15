"use strict";

var BaseController = require("./BaseController");
var Promise = require('bluebird');
var co = Promise.coroutine;

class ApiController extends BaseController {

    constructor(env) {
        super(env);
    }

    test() {
        var self = this;
        return (req, resp, next) => {
            resp.json({body: req.body, query: req.query, params: req.params,  status: "ok"});
        }
    }

    getParam(req, name) {
        if (req.body[name])
            return req.body[name];
        return req.query[name];
    }

    getSession(req) {
        if (req.cookies.session)
            return req.cookies.session;
        return this.getParam(req, "session");
    }
}

module.exports = ApiController;