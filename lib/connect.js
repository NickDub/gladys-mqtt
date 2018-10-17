var mqtt = require('mqtt');
var handler = require('./handler.js');
var shared = require('./shared.js');

module.exports = function () {

	return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
		.spread(function (url, username, password) {

			var client = mqtt.connect(url, {
				username: username,
				password: password
			});

			client.on('connect', function () {
				// Owntracks topic
				client.subscribe('owntracks/+/+');

				// Sonoff topic
				client.subscribe('stat/+/+');

				sails.log.debug(`MQTT - Successfully connected to MQTT : ${url}`);
			});

			client.on('error', function (err) {
				sails.log.error(`MQTT - Fail to connect to MQTT : ${url}`);
			});

			client.on('message', function (topic, message) {
				sails.log.debug(`MQTT - New message in topic ${topic}`);
				handler(topic, message.toString());
			});

			shared.setClient(client);

			return client;
		});
};