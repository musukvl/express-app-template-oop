"use strict";
var Promise = require('bluebird');
var co = Promise.coroutine;
var BaseMiddleware = require("./BaseMiddleware");

class SiteUserMiddleware extends BaseMiddleware {

    constructor(appEnv) {
        super(appEnv);
        this._logger = this.appEnv.logger('SiteUserMiddleware');
    }

    create() {
        var self = this;
        return (req, res, next) => {
            co(function* () {
                if (self.isStatic(req) || self.isApiCall(req)) {
                    next();
                    return;
                }

                if (!req.logbook) {
                    req.logbook = {};
                }

                var user = yield self.findUser(req);
                if (!user) {
                    res.status(404);
                    res.render('404', {url: req.url, message: "Logbook for this user not found."});
                    return;
                }

                req.logbook.siteUser = user;
                next();
            })();
        }

    }

    findUser(req) {
        var self = this;
        return co(function*() {
            var host = req.get('host');
            host = host.replace(/:\d+$/, "").replace(/^www\./, "").toLowerCase();
            // get site user by host
            var user = yield self.appEnv.repo.users.getUserByHost(host);
            if (user) {
                return user;
            }

            if (req.params.userId) {
                user = yield self.appEnv.repo.users.getUserByName(req.params.userId);
                if (user) {
                    return user;
                }
            }

            self._logger.debug('Get site user by default config user = ' + self.appEnv.config('default-user'));

            var defaultUserName = self.appEnv.config('default-user');
            user = yield self.appEnv.repo.users.getUserByName(defaultUserName);
            return user;
        })();
    }

};

module.exports = SiteUserMiddleware;