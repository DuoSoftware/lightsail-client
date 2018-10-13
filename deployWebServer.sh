#!/bin/bash
cd /
cp -a smoothflow-activity-server smoothflow-activity-server-old
rm -r smoothflow-activity-server
git clone -b development https://duobuilduser:DuoS12345@github.com/DuoSoftware/smoothflow-activity-server.git
cd /smoothflow-activity-server
npm install
OUTPUT="$(netstat -lpn | grep '5555' | cut -d 'N' -f 2 | tr -d '[:space:]'  | cut -d '/' -f 1)"
echo "${OUTPUT}"
kill -KILL  "${OUTPUT}"
node app.js $1 $2
rm -r /smoothflow-activity-server-old