var handler = require('./handler/index.js');

module.exports = function(topic, message) {
	try{
		// Owntracks topic
		if(topic.indexOf('owntracks') >= 0) {
			var obj = JSON.parse(message);
			return handler.owntrack(topic, obj);
		}

		// Sonoff topic
		if(topic.indexOf('stat') >= 0) {
			gladys.device.getByService({service: 'sonoff'})
				.then(function(devices) {
					devices.forEach(function(device) {
						if(topic.indexOf(device.identifier) >= 0) {
							var obj = message.toString();
							return handler.sonoff(topic, obj);
						}
					});
				});
		}
		
		// Roomba topic
		if(topic.indexOf('roomba') >= 0) {
			var obj = JSON.parse(message);
			return handler.roomba(topic, obj);
		}
	} catch(e) {
		sails.log.warn(`MQTT : handler : fail to handle incoming message on topic ${topic}`);
		sails.log.warn(e);
	};
};