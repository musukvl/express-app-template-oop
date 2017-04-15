exports.getParam = function(req, name) {
    function getParam(req, name) {
        if (req.body[name])
            return req.body[name];
        return req.query[name];
    }
};

exports.extend = function (target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
};

exports.test = function() {
    console.log('test');
}