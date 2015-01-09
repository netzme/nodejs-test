/**
 * Created by untung on 1/5/15.
 */
var expect = require("expect.js"),
    mqtt =  require("mqtt");

describe("MQTT Server Test", function(){

    var topic = "/topic";

    describe("when publisher publish a message with topic '"+ topic + "'", function(){
        var publisher = null,
            subscriber = null,
            subscriber2 = null,
            server = null;

        before(function(){
            server = require("../server");
            subscriber = mqtt.createClient(1883);
            subscriber.subscribe(topic);
            subscriber2 = mqtt.createClient(1883);
            subscriber2.subscribe(topic);
        });

        beforeEach(function(){
            publisher = mqtt.createClient(1883);
            publisher.publish(topic, "test publish", {retain: true});
        });

        it("subscriber should receive a message", function(done){
            subscriber.on('message', function(top, msg){
                expect(top).not.to.be(null);
                expect(msg).not.to.be(null);
                subscriber.end();
                done();
            });
        });

        it("subscriber payload/message should have 'timestamp' property", function(done){
            subscriber2.on('message', function(top, msg){
                expect(JSON.parse(msg)).to.have.property('timestamp');
                subscriber2.end();
                done();
            });
        });

        afterEach(function(){
            publisher.end();
        });
    });
});
