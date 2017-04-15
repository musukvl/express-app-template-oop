"use strict";
var Promise = require('bluebird');
var co = Promise.coroutine;
var BaseMiddleware = require("./BaseMiddleware");


    class ApiMiddleware extends BaseMiddleware {

    constructor(appEnv) {
        super(appEnv);
        this._logger = appEnv.logger('ApiMiddleware');
    }


    create() {
        var self = this;
        return (req, res, next) => {
            co(function* () {
                self._logger.debug('req:\n' + JSON.stringify(req.body));

                var end = res.end;
                res.end = function (chunk, encoding) {
                    res.end = end;
                    if (chunk) {
                        var x = JSON.parse(chunk);
                        self._logger.debug('res:\n' + JSON.stringify(x, null, 4));
                    }
                    res.end(chunk, encoding);
                };
                next();
            })();
        }
    }
};

module.exports = ApiMiddleware;