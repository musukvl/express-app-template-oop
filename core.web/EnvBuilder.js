"use strict";

var Promise = require('bluebird');
var co = Promise.coroutine;
var MongoClient = require('mongodb').MongoClient;
Promise.promisifyAll(MongoClient);

var AppEnvironment = require('./AppEnvironment');

class EnvBuilder {

    constructor(config) {
        this.config = config;
    }

    build() {
        var self = this;

        var appEnv =
            co(function*() {
                var appEnv = new AppEnvironment(self.config);

                appEnv.logger().info('Connecting to db...');
                try {
                    appEnv.db = yield MongoClient.connect(self.config.get('mongo-connection-string'));
                    appEnv.logger().info('Connected.');
                } catch (err) {
                    appEnv.logger().error('Db connection failed...', err);
                    throw err;
                }
                return appEnv;
            })();
        return Promise.resolve(appEnv);
    }
}

module.exports = EnvBuilder;