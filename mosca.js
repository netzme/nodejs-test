/**
 * Created by untung on 1/9/15.
 */
var mosca = require("mosca"),
    setting = {
        port: 1885
    };

var server = new mosca.Server(setting);
server.published = function(packet, client, callback){
    var newPayload = {message: packet.payload.toString(), timestamp: new Date()};
    var newPacket = {
        topic: packet.topic + "_new",
        payload: JSON.stringify(newPayload),
        retain: packet.retain,
        qos: packet.qos
    };
    server.publish(newPacket, callback);
}

exports.modules = server;