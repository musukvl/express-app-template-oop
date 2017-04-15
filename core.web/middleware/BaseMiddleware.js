"use strict";

class BaseMiddleware {

    constructor(appEnv) {
        this.appEnv = appEnv;
    }

    isApiCall(req) {
        var regex = /^\/api/;
        return regex.test(req.originalUrl);
    }

    isStatic(req) {
        var regex = /\/img\/|\/js\/|\/css\/|\/u\//i;
        return regex.test(req.url);
    };
}

module.exports = BaseMiddleware;