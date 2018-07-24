#!/bin/bash
sudo rm $1
sudo wget http://$2.smoothflow.io/engine/BuiltExecutables/$1/$1
sudo chmod 777 $1
sudo npm install -g forever
sudo crontab -l && echo "@reboot /usr/bin/forever start /lightsail-client/app.js" | crontab -
sudo nohup ./$1 > /dev/null 2>&1 &