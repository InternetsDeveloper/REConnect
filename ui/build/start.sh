#!/usr/bin/env bash

source ~/.bashrc
source ~/.profile

echo "change directories to application directory"
cd /var/www/ui

echo "Application Start"
pm2 start gulp