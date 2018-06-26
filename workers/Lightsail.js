const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const schedule = require('node-schedule');
const {exec} = require('child_process');
const sh = require('shelljs');

module.exports.Create = (req, res) => {

    let port = req.body.port;
    let filename = req.body.flow_name;

    let s3Link = "http://" + req.body.env + ".smoothflow.io/engine/BuiltExecutables/" + filename + "/" + filename
    //let s3Link = "http://" + req.body.env + ".smoothflow.io/engine/" + filename
    console.log(s3Link);

    child = sh.exec('bash deployBinary.sh ' + filename + " " + req.body.env, {silent: false, async: true});

    child.on('exit', function (c) {
        console.log(c);
        res.send({IsSuccess: true, Message: "Binary hosted successfully."});
    });

    /*
        exec(`sudo rm ${filename}`, (err, stdout, stderr) => {
            exec(`sudo wget ${s3Link}`, (err, stdout, stderr) => {
                if (err) {
                    console.log("error getting file");
                    res.send({IsSuccess: false, Message: err})
                } else {
                    console.log("file recieved");
                    exec(`chmod 777 ${filename}`, (err, stdout, stderr) => {
                        if (err) {
                            console.log("error giving permission");
                            res.send({IsSuccess: false, Message: err})
                        } else {
                            console.log("permission given");
                            exec(`ps -A`, (err, stdout, stderr) => {
                                console.log("file executed");
                                res.send({IsSuccess: true, Message: "All okay...."});
                            });
                        }
                    });
                }
            });
        });
    */

}