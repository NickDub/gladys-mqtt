var client = null;

module.exports = {

	getClient: function(){

		if(client === null) {
			return new Error('Client is not connected yet');
		}

		return client;
	},

	setClient: function(newClient){
		client = newClient;
	}
};