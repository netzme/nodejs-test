/**
 * Created by untung on 1/6/15.
 */
var mqtt = require("mqtt");

var server = mqtt.createServer(function(client){
    var self = this;

    var addTimestampProperty = function(payload){
        return {
            message: payload,
            timestamp: new Date()
        }
    }

    client.on("connect", function(packet){
        client.connack({returnCode: 0});
        if (!self.clients) self.clients = {};
        client.id = packet.clientId;
        self.clients[client.id] = client;

    });

    client.on("publish", function(packet){
        var newPacket = addTimestampProperty(packet.payload);
        for (var clientId in self.clients) {
            self.clients[clientId].publish({topic: packet.topic, payload: JSON.stringify(newPacket)});
        }
    });

    client.on("subscribe", function(packet){
        var granted = [];
        for(var i = 0; i < packet.subscriptions.length; i++){
            granted.push(packet.subscriptions[i].qos);
        }
        client.suback({granted: granted, messageId: packet.messageId});
    });
}).listen(1883);


exports.modules = server;