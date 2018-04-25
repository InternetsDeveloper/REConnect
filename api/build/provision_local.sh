#!/usr/bin/env bash

CYAN='\033[1;36m'
NC='\033[0m' # No Color

# Include the global config file
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $DIR/config

#echo -e "${CYAN}Changing directories ${NC}"
# changing directories
cd /Users/$USER/$APPNAME/api

echo -e "${CYAN}installing Homestead ${NC}"
composer require laravel/homestead --dev

if [ ! -f .env ]; then
    echo ""
    echo -e "${CYAN}.env does not exist.${NC}"
    echo -e "${CYAN}Creating .env file ${NC}"
    cp .env.example .env && php artisan key:generate
    echo -e "${CYAN}.env Created! ${NC}"
else
    echo ""
    echo -e "${CYAN}.env Exists, not creating new .env ${NC}"
fi

if [ ! -f Homestead.yaml ]; then
    echo ""
    echo -e "${CYAN}Homestead.yaml does not exist.${NC}"
    echo -e "${CYAN}Creating Homestead.yaml file ${NC}"
    cp Homestead.yaml.example Homestead.yaml
    echo -e "${CYAN}Homestead.yaml Created! ${NC}"
else
    echo ""
    echo -e "${CYAN}Homestead.yaml Exists, not creating new .env ${NC}"
fi