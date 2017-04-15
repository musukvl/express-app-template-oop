"use strict";
var winston = require('winston');

//var DailyRotateFile = require('winston-daily-rotate-file');

class LoggerFactory {

    constructor(config) {
        this.config = config;
    }

    build(){
        var self = this;
        var logLevelsConfig = {
            levels: {
                silly: 6,
                verbose: 5,
                info: 4,
                data: 3,
                warn: 2,
                debug: 1,
                error: 0
            },
            colors: {
                silly: 'magenta',
                verbose: 'cyan',
                info: 'green',
                data: 'grey',
                warn: 'yellow',
                debug: 'blue',
                error: 'red'
            }
        };

        winston.setLevels(logLevelsConfig.levels);
        winston.addColors(logLevelsConfig.colors);

        winston.remove(winston.transports.Console);
        winston.add(winston.transports.Console, {colorize: true, timestamp: true, level: 'silly'});
        winston.add(winston.transports.File, { filename: 'log/debug.log', json: false, level:'info' });
/*
        if (self.config && self.config.get("mongo-log-connection-string")) {
            winston.add(winston.transports.MongoDB, {collection: "log", db: self.config.get("mongo-log-connection-string"), level:'info'});
        }
  */
        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({ level: 'silly' }),
                new (winston.transports.File)({
                    filename: 'log/debug.log',
                    level: 'info'
                })
            ]
        });

        return logger;
    }
}

module.exports = LoggerFactory;
