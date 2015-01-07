/**
 * Created by untung on 1/5/15.
 */
var expect = require("expect.js"),
    mqtt =  require("mqtt");

describe("MQTT Server Test", function(){

    var publisher = null,
        subscriber = null,
        server = null,
        topic = "topic";

    before(function(){
        server = require("../server");
        publisher = mqtt.createClient(1883);
        publisher.publish("/" + topic, "test publish");
        subscriber = mqtt.createClient(1883);
        subscriber.subscribe("/" + topic);
    });

    describe("when subscriber receive a message from client", function(){

        it("subscriber should receive a message", function(done){
            subscriber.on('message', function(top, msg){
                expect(top).not.to.be(null);
                expect(msg).not.to.be(null);
                done();
            });
        });

        it("subscriber should have a valid subscriptions", function(done){
            expect(subscriber.subscriptions.length).not.to.equal(0);
            done();
        });

        it("subcriber payload/message should have 'timestamp' property", function(done){
            subscriber.on('message', function(top, msg){
                expect(JSON.parse(msg)).to.have.property('timestamp');
                done();
            });
        });
    });


    after(function(){
        publisher.end();
        subscriber.end();
    });
});
