#!/bin/bash
cd /
sudo cp -a smoothflow-activity-server smoothflow-activity-server-old
sudo rm -r smoothflow-activity-server
sudo git clone -b development https://duobuilduser:DuoS12345@github.com/DuoSoftware/smoothflow-activity-server.git
cd smoothflow-activity-server
sudo npm install
sudo forever stop app.js
sudo forever start app.js
sudo rm -r /smoothflow-activity-server-old