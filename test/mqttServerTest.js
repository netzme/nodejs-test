/**
 * Created by untung on 1/5/15.
 */
var expect = require("expect.js"),
    mqtt =  require("mqtt");

describe("MQTT Server Test", function(){

    var topic = "/topic",
        newTopic = topic + "_new";

    describe("when publisher publish a message with topic '"+ topic + "'", function(){
        var publisher = null,
            subscriber = null,
            subscriber2 = null,
            subscriber3 = null,
            subscriber4 = null,
            server = null,
            testMessage = {message: "test publish"};

        before(function(){
            server = require("../src/server");
            subscriber = mqtt.createClient(1883);
            subscriber.subscribe(topic);
            subscriber2 = mqtt.createClient(1883);
            subscriber2.subscribe(newTopic);
            subscriber3 = mqtt.createClient(1883);
            subscriber3.subscribe(newTopic);
            subscriber4 = mqtt.createClient(1883);
            subscriber4.subscribe(topic);
        });

        after(function(done){
            server.modules.close(function(){
                done();
            });
        });

        beforeEach(function(){
            publisher = mqtt.createClient(1883);
            publisher.publish(topic, JSON.stringify(testMessage), {retain: true});
        });

        afterEach(function(){
            publisher.end();
        });

        it("subscriber should receive a message", function(done){
            subscriber.on('message', function(top, msg){
                expect(top).not.to.be(null);
                expect(msg).not.to.be(null);
                subscriber.end();
                done();
            });
        });

        it("subscriber payload/message topic " + topic + "should not have 'timestamp' property", function(done){
            subscriber4.on('message', function(top, msg){
                expect(JSON.parse(msg)).not.to.have.property('timestamp');
                subscriber4.end();
                done();
            });
        });

        it("subscriber topic '" + newTopic + "' should receive the same message", function(done){
            subscriber2.on('message', function(top, msg){
                expect(JSON.parse(msg).message).to.be.equal(testMessage.message);
                subscriber2.end();
                done();
            });
        });

        it("subscriber payload/message should have 'timestamp' property", function(done){
            subscriber3.on('message', function(top, msg){
                expect(JSON.parse(msg)).to.have.property('timestamp');
                subscriber3.end();
                done();
            });
        });
    });
});
