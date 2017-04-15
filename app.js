#!/usr/bin/env node

"use strict";

var ServerBuilder = require('./ServerBuilder');
var config = require('nconf').file({ file: 'config.json' });

var serverBuilder = new ServerBuilder(config);
serverBuilder.build();
