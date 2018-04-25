#!/usr/bin/env bash

CYAN='\033[1;36m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

# Include the global config file
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $DIR/config


if which brew >/dev/null; then
	echo ""
	echo -e "${CYAN}Homebrew exists - moving on ${NC}"
else
	echo -e "${CYAN}Installing Homebrew. Please follow on screen instructions ${NC}"
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	echo ""
fi


if which node >/dev/null; then
	echo ""
	echo -e "${CYAN}Node exists - checking version ${NC}"


	read version _ <<< $(node --version)
	echo -e "Node $version"

	if [ "$version" == $NODE_VERSION ]; then
		echo ""
		echo -e "${CYAN}node is the correct version, not updating node ${NC}"
	else
		echo -e "${CYAN}update to latest version of node ${NC}"
		brew upgrade node
	fi
else
	echo ""
	echo -e "${CYAN}Node does not exist - using Homebrew to install Node ${NC}"
	brew install node
fi

echo ""
echo -e "${CYAN}removing node modules ${NC}"
cd /Users/$USER/worthclark/ui
rm -rf node_modules

echo ""
echo -e "${CYAN}removing server files ${NC}"
rm -rf server

echo ""
echo -e "${CYAN}running npm install ${NC}"
npm install