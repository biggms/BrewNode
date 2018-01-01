exports.connect = function (host, exchange) {
    exports.exchange = exchange;
    return new Promise(function (resolve, reject) {
        require('amqplib').connect(host)
            .then(connection => {
                return connection.createChannel();
            })
            .then(channel => {
                exports.channel = channel;
                return channel.assertExchange(exchange, 'topic', {durable: true});
            })
            .then((exchange) => {
                resolve(exchange);
            })
            .catch(err => {
                reject(err);
            })
    })
};

exports.recv = function (topic, callback) {
    return new Promise(function (resolve, reject) {
        exports.channel.assertQueue('', {exclusive: true})
            .then(q => {
                return exports.channel.bindQueue(q.queue, exports.exchange, topic);
            })
            .then(q => {
                return exports.channel.consume(q.queue, callback, {noAck: true})
            })
            .then(ret => {
                resolve(ret);
            })
            .catch(err => {
                reject(err);
            })
    });
};

exports.send = function (topic, message) {
    exports.channel.publish(exports.exchange, topic, new Buffer(message));
};
