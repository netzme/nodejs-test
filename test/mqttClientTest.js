/**
 * Created by untung on 1/5/15.
 */
var expect = require("expect.js"),
    mqtt =  require("mqtt");

describe("MQTT Server Test", function(){

    var publisher = null,
        subscriber = null,
        server = null,
        topic = "/topic";

    before(function(){
        server = require("../server");
        subscriber = mqtt.createClient(1883);
        subscriber.subscribe(topic);
    });

    beforeEach(function(){
        publisher = mqtt.createClient(1883);
        publisher.publish(topic, "test publish", {retain: true});
    });


    describe("when publisher publish a message with topic '"+ topic + "'", function(){
        it("subscriber should receive a message", function(done){
            subscriber.on('message', function(top, msg){
                expect(top).not.to.be(null);
                expect(msg).not.to.be(null);
            });
            done();
        });

        it("subscriber payload/message should have 'timestamp' property", function(done){
            subscriber.on('message', function(top, msg){
                expect(JSON.parse(msg)).to.have.property('timestamp');
            });
            done();
        });
    });


    afterEach(function(){
        publisher.end();
    });

    after(function(){
        subscriber.end();
    });
});
