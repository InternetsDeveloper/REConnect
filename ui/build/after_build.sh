#!/usr/bin/env bash

# Include the global config file
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $DIR/config

#sudo chown -R $(whoami) $(npm config get prefix)/{node_modules,bin,share}

#sudo chown -R ubuntu:ubuntu /var/www/ui
#sudo chmod 0777 -R /var/www/ui

########## BUILD FUNCTIONS ####################

function install_node_npm {
    DEBIAN_FRONTEND=noninteractive sudo apt-get -y update
    DEBIAN_FRONTEND=noninteractive sudo apt-get -y install build-essential libssl-dev
    DEBIAN_FRONTEND=noninteractive sudo apt-get -y install git
    DEBIAN_FRONTEND=noninteractive sudo apt-get -y update

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

    sudo apt-get install -y build-essential

	#DEBIAN_FRONTEND=noninteractive sudo apt-get -y install python
    #sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
}


function install_gulp {
	echo "change directory to /var/www/ui"
    change_directory

    echo "install gulp globally"
    npm install -g gulp
}

function install_pm2 {
	echo "install pm2 globally"
	npm install pm2 -g
}

function change_directory {
	cd /var/www/ui
}

function create_node_modules {
	echo "remove all node_modules"
    sudo rm -rf /var/www/ui/node_modules

    echo "create node_modules directory if it does not exist"
    sudo mkdir /var/www/ui/node_modules
	sudo chmod 0777 -R /var/www/ui/node_modules
}


function update_install_npm {
	echo "Run npm install"
	npm install
}

function set_environment {
	echo "export ENV=stage" >> ~/.profile

	source ~/.profile
}



###### RUN SCRIPTS FOR BUILD #######

if which npm >/dev/null; then
    echo "npm exists - skip installation of npm"
else
	install_node_npm
fi


if which gulp >/dev/null; then
    echo "skip gulp/npm installation"
else
	install_gulp
fi

if which pm2 >/dev/null; then
    echo "skip gulp/npm installation"
else
	install_pm2
fi

#if [ ! -f "~/.npm-global" ]; then
#	mkdir ~/.npm-global
#	npm config set prefix '~/.npm-global'
#	export PATH=~/.npm-global/bin:$PATH
#	source ~/.profile
#fi

#if [ -d "/var/www/ui/node_modules" ]; then
#
#	create_node_modules
##  # Control will enter here if $DIRECTORY exists.
#else
#	create_node_modules
#fi

#echo "change permissions to all files in /var/www/ui recursively"
#sudo mkdir -p /var/www/ui/server
#sudo chmod 0777 -R /var/www/ui

#create_node_modules

sudo chmod 0777 -R /var/www/ui
sudo chmod 0777 -R /var/www/ui/node_modules

echo "change directory to /var/www/ui"
change_directory

echo "Application Stop"
pm2 stop all

npm install node-sass

update_install_npm

npm install pm2 -g

#echo "Run npm rebuild node-sass"
#npm rebuild node-sass



#echo "Run npm rebuild node-sass"
#/home/ubuntu/.nvm/versions/node/v8.0.0/bin/npm rebuild node-sass
#
#echo "Run npm install node-sass"
#/home/ubuntu/.nvm/versions/node/v8.0.0/bin/npm install node-sass
#
#echo "Run npm update"
#/home/ubuntu/.nvm/versions/node/v8.0.0/bin/npm update
