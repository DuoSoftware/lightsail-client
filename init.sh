#!/usr/bin/env bash
sudo npm install -g forever
sudo export EDITOR=/usr/bin/vim.basic
sudo crontab < my.cron
#sudo crontab -l && echo "@reboot /usr/bin/forever start /lightsail-client/app.js" | crontab -