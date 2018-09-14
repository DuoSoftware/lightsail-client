let shelljs = require('shelljs');


module.exports.runWebServer = ()=>{

    child = shelljs.exec('bash deployWebSever.sh', {silent: false, async: true});

    child.on('exit', function (c) {
        console.log(c);
        res.send({IsSuccess: true, Message: "WebServer Deployed Successfully"});
    });



};