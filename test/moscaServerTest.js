/**
 * Created by untung on 1/9/15.
 */
var expect = require("expect.js"),
    mqtt =  require("mqtt");

describe("Mosca Server test", function(){
    var topic = "/topic",
        newTopic = topic + "_new";

    describe("when publisher publish a message with topic '"+ topic + "'", function(){
        var publisher = null,
            subscriber = null,
            subscriber2 = null,
            subscriber3 = null,
            server = null,
            testMessage = "test publish";

        before(function(done){
            server = require("../mosca");
            server.modules.on('ready', function(){
                subscriber = mqtt.createClient(1885);
                subscriber.subscribe(topic);
                subscriber2 = mqtt.createClient(1885);
                subscriber2.subscribe(newTopic);
                subscriber3 = mqtt.createClient(1885);
                subscriber3.subscribe(newTopic);
                done();
            });
        });

        beforeEach(function(){
            publisher = mqtt.createClient(1885);
            publisher.publish(topic, testMessage);
        });

        it("subscriber should receive a message", function(done){
            subscriber.on('message', function(top, msg){
                expect(top).not.to.be(null);
                expect(msg).not.to.be(null);
                subscriber.end();
                done();
            });
        });

        it("subscriber topic '" + newTopic + "' should receive the same message", function(done){
            subscriber2.on('message', function(top, msg){
                expect(JSON.parse(msg).message).to.be.equal(testMessage);
                subscriber2.end();
                done();
            });
        });

        it("message/payload subscriber topic '" + newTopic + "' should have 'timestamp' property", function(done){
            subscriber3.on('message', function(top, msg){
                expect(JSON.parse(msg)).to.have.property('timestamp');
                subscriber3.end();
                done();
            });
        });

        afterEach(function(){
            publisher.end();
        });
    });
});