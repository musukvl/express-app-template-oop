"use strict";

class BaseController {

    constructor(env) {
        this.env = env;
    }

    getParam(req, name) {
        if (req.body[name])
            return req.body[name];
        return req.query[name];
    }
}

module.exports = BaseController;