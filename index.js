
module.exports = function(sails){
	var emit = require('./lib/emit.js');
	var connect = require('./lib/connect.js');
	
	gladys.on('ready', function(){
		connect();
	});
	
	return {
		emit: emit,
	};

};