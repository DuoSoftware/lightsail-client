#!/bin/bash
sudo ps -ef | grep $1 | grep -v grep | awk '{print $2}' | xargs kill -KILL
sudo rm /lightsail-client/$1