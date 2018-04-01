部署流程：
---
* 安装redis : yum install redis
* 安装mongodb : 
    vi /etc/yum.repos.d/mongodb-org-3.2.repo 
    
    [mongodb-org-3.2]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-3.2.asc
    
    yum -y install mongodb-org  
    /etc/init.d/mongod start
* 安装mqtt : yum install mosquitto   systemctl start mosquitto
* 修改配置文件config/config.prod.js   
* 启动应用 npm start / npm stop
