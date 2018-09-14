let shelljs = require('shelljs');


module.exports.runWebServer = (res)=>{

    child = shelljs.exec('bash /lighsail-client/deployWebSever.sh', {silent: false, async: true});

    child.on('exit', function (c) {
        console.log(c);
        res.send({IsSuccess: true, Message: "WebServer Deployed Successfully"});
    });



};