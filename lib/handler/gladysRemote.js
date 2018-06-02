/**
 * This function is taking remote job sent by remote modules
 * And perform action
 * @param {String} topic the MQTT topic
 * @param {Object} params JS object sent by the remote module
 */
module.exports = function(topic, params, client) {
   var promise;
   switch(topic) {

       // System function
       case 'gladys/master/heartbeat':
            promise = gladys.machine.heartbeat({
                uuid: params.machine_id
            });
       break;

       case 'gladys/master/module/heartbeat':
            promise = gladys.module.heartbeat({
                machine: params.machine_id,
                slug: params.slug
            });
       break;

       case 'gladys/master/machine/create':
            promise = gladys.machine.create(params);
       break;

       // Event API
       case 'gladys/master/event/create':
            promise = gladys.event.create(params);
       break;

       // Device API
       case 'gladys/master/device/create':
            promise = gladys.device.create(params);
       break;

       case 'gladys/master/devicestate/create':
            promise = gladys.deviceState.create(params);
       break;

       // Param getValues
       case 'gladys/master/param/getvalues':
            promise = gladys.param.getValues(params.keys)
                .then((values) => {
                    client.emit(`gladys/machine/${params.machine_id}/module/${params.module_slug}/param/getvalues`, JSON.stringify(values));
                });
       break;
   }

   return promise
        .catch((err) => {
            sails.log.warn(`Gladys : MQTT : GladysRemote : Unable to perform action.`);
            sails.log.warn(err);
        });
};