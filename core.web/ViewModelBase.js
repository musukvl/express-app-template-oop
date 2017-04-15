var common = require('../amba/common.js');

function ViewModelBase(req, viewModel) {
    this.subtitle = "";
    this.auth = {};
    common.extend(this, viewModel);
}

ViewModelBase.prototype._ = require('underscore');

module.exports = ViewModelBase;