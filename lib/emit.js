var util = require('util');
var mqtt = require('mqtt');
var shared = require('./shared.js');

// MQTT protocol (%prefix%/%topic%/%command%)

module.exports = function emit(topic,value) {

	return sendMqttMsg(topic,value);
};

function sendMqttMsg(topic, value) {
	return shared.getClient()
		.then((client) => {
			console.log(`Gladys MQTT - Sending ${topic}`);
			client.publish(topic, value);
		});
}