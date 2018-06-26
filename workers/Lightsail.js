const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const schedule = require('node-schedule');
const {exec} = require('child_process');

AWS.config.apiVersions = {
    lightsail: '2016-11-28',
    // other service API versions
};

var lightsail = new AWS.Lightsail({
    region: config.host.aws.region,
    credentials: {
        "accessKeyId": config.host.aws.credentials.accessKeyId,
        "secretAccessKey": config.host.aws.credentials.secretAccessKey
    }
});


module.exports.Create = (req, res) => {

    let port = req.body.port;
    let filename = req.body.flow_name;

    //let s3Link = "http://" + req.body.env + ".smoothflow.io/engine/BuiltExecutables/" + filename + "/" + filename
    let s3Link = "http://" + req.body.env + ".smoothflow.io/engine/" + filename
    console.log(s3Link);

    let userdata = "sudo su \nwget \"" + s3Link + "\" \nchmod 777 " + filename + " \n./" + filename + " &"

    exec(`wget ${s3Link}`, (err, stdout, stderr) => {
        if (err) {
            res.send({IsSuccess: false, Message: err})
        } else {
            exec(`chmod 777 ${filename}`, (err, stdout, stderr) => {
                if (err) {
                    res.send({IsSuccess: false, Message: err})
                } else {
                    exec(`./${filename} &`, (err, stdout, stderr) => {
                        if (err) {
                            res.send({IsSuccess: false, Message: err})
                        } else {
                            res.send({IsSuccess: true, Message: "All okay...."})
                        }
                    });
                }
            });
        }
    });
}


module.exports.Host = (req, res) => {
    let blueprint = "ubuntu_16_04_2";
    let zone = "us-east-1a";
    let bundle = "nano_1_0";
    let instanceNames = [];
    let port = 3333;
    let serverName = req.body.server_name;

    if (req.body.blueprint && req.body.blueprint != "") {
        blueprint = req.body.blueprint;
    }

    if (req.body.zone && req.body.zone != "") {
        zone = req.body.zone;
    }

    if (req.body.serverspec && req.body.serverspec != "") {
        bundle = req.body.serverspec;
    }

    if (req.body.server_name && req.body.server_name != "") {
        instanceNames.push(req.body.server_name);
    } else {
        res({IsSuccess: false, Message: "WorkFlow name is mandatory."})
    }

    let gitUrl = "https://github.com/DuoSoftware/lightsail-client"
    console.log(gitUrl);

    let userdata = "sudo su\niptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port " + port + "\ncurl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -\nsudo apt-get install -y nodejs\ngit clone " + gitUrl + "\ncd lightsail-client\nnpm install\nnode app.js &"
    console.log(userdata);

    var params = {
        availabilityZone: zone, /* required */
        blueprintId: blueprint, /* required */
        bundleId: bundle, /* required */
        instanceNames: instanceNames,
        //customImageName: 'STRING_VALUE',
        //keyPairName: 'STRING_VALUE',
        userData: userdata
    };

    lightsail.createInstances(params, function (err, data) {
        if (err) {
            if (err.message.indexOf("Some names are already in use") != -1) {
                //delete the instance
                lightsail.deleteInstance({instanceName: serverName}, function (err, data) {
                    if (err) {
                        res.send({IsSuccess: false, Message: err})
                    } // an error occurred
                    else {
                        lightsail.createInstances(params, function (err, data) {
                            if (err) {
                                res.send({IsSuccess: false, Message: err})
                            } // an error occurred
                            else {
                                res.send({IsSuccess: true, Message: data})
                            }           // successful response
                        });
                    }           // successful response
                });
            } else {
                res.send({IsSuccess: false, Message: err})
            }
        } // an error occurred
        else {
            res.send({IsSuccess: true, Message: data})
        }           // successful response
    });
}