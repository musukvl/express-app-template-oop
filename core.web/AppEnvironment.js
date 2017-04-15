"use strict";
var LoggerFactory = require('./LoggerFactory');
var Logger = require('./Logger');

class AppEnvironment {

    constructor(config){
        this._config = config;
        var loggerFactory = new LoggerFactory(config);
        this._internalLogger = loggerFactory.build();
        this._db = null;
        this._repo = null;
        this._loggers = {};
    }

    set db(value) {
        this._db = value;
    }

    get db(){
        return this._db;
    }

    config(param) {
        return this._config.get(param);
    }

    logger(name) {
        if (!name) {
            name = "";
        }
        if (!this._loggers[name]) {
            var internalLogger = this._internalLogger;
            if (name && !this.config("loggers") != "all") {
                var loggerRequired = this.config("loggers").find(x => x == name);
                if (!loggerRequired) {
                    internalLogger = null;
                }
            }
            this._loggers[name] = new Logger(name, internalLogger);
        }
        return this._loggers[name];
    }
}

module.exports = AppEnvironment;