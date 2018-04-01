'use strict';


module.exports = app => {
    app.beforeStart(async() => {
        app.mqtt.subscribe('server/#');
        app.mqtt.on('message', function (topic, message) {
            console.log('mqtt arrive:' + topic + ': ' + message.toString())
            let deviceId = topic.substr(7);
            const ctx = app.createAnonymousContext();
            ctx.helper.activeDevice(deviceId);
            let str = message.toString().replace(/\b0(\d)/g, "$1");
            try {
                var msgObj = JSON.parse(str);
                let mqttMsg = new app.model.Mqtt({
                    topic: topic,
                    createTime: parseInt(msgObj.time / 1000),
                    deviceId: deviceId,
                    operation: msgObj.operate,
                    content: str,
                    msgId: msgObj.id
                });
                mqttMsg.save();
                msgObj.deviceId = deviceId;
                ctx.service.device.process(msgObj);
            } catch (e) {
                console.log('mqtt message error')
            }
        });
    });
};