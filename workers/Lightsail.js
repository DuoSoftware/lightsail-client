const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const schedule = require('node-schedule');
const {exec} = require('child_process');

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