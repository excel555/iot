const md5 = require('md5');
module.exports = {
    schedule: {
        interval: '1s', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
        disable: true,
        immediate: true
    },
    async task(ctx) {
        console.log('test in ...')
        const app = ctx.app;
        let i = 2000;
        while (i-- > 0) {
            let requestId = 'id-'+new Date().getTime() + i;
            let appkey = '3fb916a8b1d1a179bd5f746bf9509b5e';
            let secret = 'e62752c688234d7c98fba16cf6d2cb4a';
            let sign = md5(appkey+ requestId + secret);
            // ctx.curl('http://140.143.236.241:8080/command/openDoor', {
            //     data: {
            //         "requestId": requestId,
            //         "appkey": appkey,
            //         "sign": sign,
            //         "params": {"deviceId": "00D051AC0006", "userId": 843177}
            //     },
            //     method: 'POST',
            //     contentType: 'json',
            //     dataType: 'json',
            // });
            // console.log(new Date() + 'count=' + i)

            let data = {"enable": false, "time": "1522490885397", "code": 2, "id": requestId, "operate": "door"}

            app.mqtt.publish('server/00D051AC0006', JSON.stringify(data));

            data = {
                "label": ["E004015085DA821E", "E004015085DA80FF", "E004015085DA768C", "E00401509E86D0F1", "E004015085DA743C", "E004015085DA7A13", "E004015085DA78E4", "E004015085DA84D8"],
                "labelNum": 0,
                "scene": "boot",
                "enable": false,
                "time": "1522491306904",
                "code": 0,
                "id": requestId,
                "operate": "inventory"
            }

            app.mqtt.publish('server/00D051AC0006', JSON.stringify(data));

            data = {"enable": false, "time": "1522491300626", "code": 0, "id": requestId, "operate": "heartbeat"}

            app.mqtt.publish('server/00D051AC0006', JSON.stringify(data));
        }
    },
};