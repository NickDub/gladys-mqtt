/**
 * This function is taking remote job sent by remote modules
 * And perform action
 * @param {String} topic the MQTT topic
 * @param {Object} params JS object sent by the remote module
 */
module.exports = function(topic, params) {
   var promise;
   switch(topic){

       // System function
       case '/gladys/master/heartbeat':
            promise = gladys.machine.heartbeat({
                uuid: params.machine_id
            });
       break;

       case '/gladys/master/module/heartbeat':
            promise = gladys.module.heartbeat({
                machine: params.machine_id,
                slug: params.slug
            });
       break;

       case '/gladys/master/machine/create':
            promise = gladys.machine.create(params);
       break;

       // Event API
       case '/gladys/event/create':
            promise = gladys.event.create(params);
       break;

       // Device API
       case '/gladys/device/create':
            promise = gladys.device.create(params);
       break;
   }

   return promise
        .catch((err) => {
            sails.log.warn(`Gladys : MQTT : GladysRemote : Unable to perform action.`);
            sails.log.warn(err);
        });
};