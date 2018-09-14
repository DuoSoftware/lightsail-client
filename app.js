const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const config = require('config');
const moment = require('moment');
const lightsail = require('./workers/Lightsail');
const activityServer = require('./workers/activityServer');
const sh = require('shelljs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

global.appStartTime = moment();

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

app.get('/', function (req, res) {
    res.send({
        version: "1.0.0",
        name: "Lightsail Client App",
        since: moment(global.appStartTime).fromNow()
    });
});

app.post('/client/lightsail/host', lightsail.Create);
app.get('/activity/run', runWebServer);

app.del('/client/lightsail/flowname/:name', lightsail.Delete);
//app.post('/lightsail/server/create', lightsail.Host);


app.listen(3333, () => {
    init();
    console.log("LightSail Client App started...")
});


function init() {
    child = sh.exec('bash init.sh', {silent: false, async: true});

    child.on('exit', function (c) {
        console.log(c);
    });
}


function runWebServer  (req,res){

    child = sh.exec('bash deployWebServer.sh', {silent: false, async: true});

    child.on('exit', function (c) {
        console.log(c);
        res.send({IsSuccess: true, Message: "WebServer Deployed Successfully"});
    });



};




