#!/usr/bin/env bash

CYAN='\033[1;36m'
NC='\033[0m' # No Color

# Include the global config file
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $DIR/config

echo ""
echo -e "${CYAN}Changing directories ${NC}"
cd /home/vagrant/api

echo ""
echo -e "${CYAN}Dump autoload ${NC}"
composer dump-autoload

echo ""
echo -e "${CYAN}Freshen up db tables and run seeders ${NC}"
php artisan migrate:refresh --seed

echo ""
echo -e "${CYAN}Clear caches ${NC}"
php artisan route:clear
php artisan clear-compiled
php artisan cache:clear
php artisan config:clear

echo ""
echo -e "${CYAN}Install passport ${NC}"
php artisan passport:install

echo ""
echo ""
echo -e "${CYAN}===========READY TO ROLL============${NC}"
