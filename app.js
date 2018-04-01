'use strict';


module.exports = app => {
    app.beforeStart(async() => {
        const ctx = app.createAnonymousContext();
        //开启mqtt 服务
        ctx.service.mqtt.process();
    });
};