#!/bin/bash
cd /
cp -a smoothflow-activity-server smoothflow-activity-server-old
rm -r smoothflow-activity-server
git clone -b development https://duobuilduser:DuoS12345@github.com/DuoSoftware/smoothflow-activity-server.git
cd smoothflow-activity-server
npm install
forever stop app.js
forever start app.js
rm -r /smoothflow-activity-server-old