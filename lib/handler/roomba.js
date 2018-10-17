
module.exports = function(topic, param){

	// If the event is a new device state
	if(param['_type'] && param['_type'] === 'stat') {
		sails.log.info(`MQTT : new roomba state: ${param.power}`);

		var datetime = new Date(parseInt(param.tst)*1000);
		var power = {
			value : parseInt(param.power),
			datetime : new Date()
		};
		var batt = {
			value : parseInt(param.batt),
			datetime : new Date()
		};
		//val
		return gladys.deviceState.createByDeviceTypeIdentifier('onoff', 'roomba', power)
			.then(() => {
				return gladys.deviceState.createByDeviceTypeIdentifier('battery', 'roomba', batt);
			});

	} else {
		return Promise.resolve();
	}

};
