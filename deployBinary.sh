#!/bin/bash
sudo rm $1
sudo wget http://$2.smoothflow.io/engine/$1
sudo chmod 777 $1
sudo nohup ./$1 > /dev/null 2>&1 &