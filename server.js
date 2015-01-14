/**
 * Created by untung on 1/6/15.
 */
var mqtt = require("mqtt");

var server = mqtt.createServer(function(client){
    var self = this;

    var addTimestampProperty = function(payload){
        var jsonPayload = JSON.parse(payload);
        jsonPayload.timestamp = new Date();
        return jsonPayload;
    };

    client.on("connect", function(packet){
        client.connack({returnCode: 0});
        if (!self.clients) self.clients = {};
        client.id = packet.clientId;
        self.clients[client.id] = client;
        if (!self.clients[client.id].subscriptions) self.clients[client.id].subscriptions = [];
    });

    client.on("publish", function(packet){
        var newPacket = addTimestampProperty(packet.payload);
        for (var clientId in self.clients) {
            var currClient = self.clients[clientId],
                clientSubscriptions = currClient.subscriptions;
            for (var i=0; i < clientSubscriptions.length; i++) {
                if (packet.topic != clientSubscriptions[i]) {
                    currClient.publish({topic: clientSubscriptions[i], payload: JSON.stringify(newPacket)});
                } else {
                    currClient.publish({topic: packet.topic, payload: packet.payload});
                }
            }
        }
    });

    client.on("subscribe", function(packet){
        var granted = [];
        for(var i = 0; i < packet.subscriptions.length; i++){
            granted.push(packet.subscriptions[i].qos);
            client.subscriptions.push(packet.subscriptions[i].topic);
        }
        client.suback({granted: granted, messageId: packet.messageId});
    });

    client.on('close', function(packet) {
        delete self.clients[client.id];
    });

});

server.listen(1883);

exports.modules = server;