#!/usr/bin/env bash
sudo export EDITOR=/usr/bin/vim.basic
sudo echo ''>> myCron
sudo crontab < myCron
#sudo crontab -l && echo "@reboot /usr/bin/forever start /lightsail-client/app.js" | crontab -