
/** 
 * Forward all messages on MQTT to corresponding machine
 */
module.exports = function(client) {
   
    gladys.on('message-notify', function(data){
        if(data.machine_id && data.module_slug) {
            sails.log.info(`Sending MQTT message : "message-notify" for remote module ${data.module_slug} on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/${data.module_slug}/notify`, JSON.stringify(data));
        }
    });

    gladys.on('notification-notify', function(data){
        if(data.machine_id && data.module_slug) {
            sails.log.info(`Sending MQTT message : "notification-notify" for remote module ${data.module_slug} on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/${data.module_slug}/notify`, JSON.stringify(data));
        }
    });

    gladys.on('devicetype-exec', function(data){
        if(data.machine_id && data.module_slug) {
            sails.log.info(`Sending MQTT message : "devicetype-exec" for remote module ${data.module_slug} on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/${data.module_slug}/devicetype/exec`, JSON.stringify(data));
        }
    });

    gladys.on('module-install', function(data){
        if(data.machine_id) {
            sails.log.info(`Sending MQTT message : "module-install" on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/install`, JSON.stringify(data));
        } 
    }); 

    gladys.on('module-uninstall', function(data){
        if(data.machine_id) {
            sails.log.info(`Sending MQTT message : "module-uninstall" on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/uninstall`, JSON.stringify(data));
        }
    });

    gladys.on('module-upgrade', function(data){
        if(data.machine_id) {
            sails.log.info(`Sending MQTT message : "module-upgrade" on machine ${data.machine_id}`);
            client.publish(`gladys/machine/${data.machine_id}/module/upgrade`, JSON.stringify(data));
        }
    });

};