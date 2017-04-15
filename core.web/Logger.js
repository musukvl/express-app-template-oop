"use strict";

class Logger {
    constructor(name, internalLogger) {
        this._name = name;
        this._internalLogger = internalLogger;
    }

    info(args){
        if (!this._internalLogger) {
            return;
        }
        var loggerParams = this.extendLoggerArgs(arguments);
        this._internalLogger.info.apply(this, loggerParams)
    }

    error(args){
        if (!this._internalLogger) {
            return;
        }
        var loggerParams = this.extendLoggerArgs(arguments);
        this._internalLogger.error.apply(this, loggerParams)
    }

    debug(args){
        if (!this._internalLogger) {
            return;
        }
        var loggerParams = this.extendLoggerArgs(arguments);
        this._internalLogger.debug.apply(this, loggerParams)
    }

    warn(args){
        if (!this._internalLogger) {
            return;
        }
        var loggerParams = this.extendLoggerArgs(arguments);
        this._internalLogger.debug.apply(this, loggerParams)
    }

    extendLoggerArgs(args) {
        var loggerParams = [];
        if (this._name) {
            loggerParams.unshift("[" + this._name + "]");
        }
        for(let arg of args) {
            loggerParams.push(arg);
        }
        return loggerParams;
    }
}

module.exports = Logger;