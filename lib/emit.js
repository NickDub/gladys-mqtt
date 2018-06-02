var util = require('util');
var mqtt = require('mqtt');
var shared = require('./shared.js');

// MQTT protocol (%prefix%/%topic%/%command%)

module.exports = function emit(topic, value) {
	try {
		var client = shared.getClient()
		sails.log.info(`Gladys MQTT - Sending to topic "${topic}"`);
		client.publish(topic, value);
	} catch(err) {
		sails.log.warn(`Gladys MQTT - Unable to send message to topic ${topic}. The client may be not connected`);
		sails.log.warn(err);
	}
};