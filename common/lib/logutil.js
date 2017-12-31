mq = require("./mq");

exports.log = function (level, message) {
    let lLog = {};
    lLog.level = level;
    lLog.message = message;
    mq.send('logging.v1', JSON.stringify(lLog));
};

exports.info = function (message) {
    exports.log("INFO", message);
};

exports.debug = function (message) {
    exports.log("DEBUG", message);
};

exports.trace = function (message) {
    exports.log("TRACE", message);
};

exports.warn = function (message) {
    exports.log("WARN", message);
};

exports.errro = function (message) {
    exports.log("ERROR", message);
};