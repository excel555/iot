'use strict';
const mqtt = require('mqtt')
const Service = require('egg').Service;
class MqttService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    async process() {
        // 开始监听mqtt服务
        const app = this.ctx.app;
        var client = mqtt.connect(app.config.mqtt.url, app.config.mqtt.options);
        client.on('connect', function () {
            console.log('Oh Glorious Day! I have connected to mqtt broker. ')
            client.subscribe('server/#');
        });

        client.on('message', async(topic, message = '') => {
            console.log('mqtt arrive:' + topic + ': ' + message.toString())
            let deviceId = topic.substr(7);
            const ctx = this.ctx
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

        client.on('error', err => {
            console.error('mqtt出错：', err)
            client.end()
            client.reconnect()      // 断开连接再次重连
        })
    }
}

module.exports = MqttService;
