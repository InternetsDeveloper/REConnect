#!/usr/bin/env bash

CYAN='\033[1;36m'
NC='\033[0m' # No Color
GREEN='\033[0;32m'

# Include the global config file
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $DIR/config

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls ~/worthclark/ui/node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}


# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1} ${NC}"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "${GREEN}✔ ${1} ${NC}"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}


function showme {
	echo "$1          $(echo_if $(program_is_installed $1))"

}



showme $1

#echo "node          $(echo_if $(program_is_installed node))"
#echo "npm           $(echo_if $(program_is_installed node))"
#echo "grunt         $(echo_if $(program_is_installed grunt))"
#echo "testacular    $(echo_if $(program_is_installed testacular))"
#echo "uglifyjs      $(echo_if $(program_is_installed uglifyjs))"
#echo "requirejs     $(echo_if $(program_is_installed r.js))"
#echo "lodash        $(echo_if $(program_is_installed lodash))"
#echo "gem           $(echo_if $(program_is_installed gem))"
#
## local npm packages
#echo "grunt-shell   $(echo_if $(npm_package_is_installed grunt-shell))"
#echo "grunt-hashres $(echo_if $(npm_package_is_installed grunt-hashres))"
#echo "gruntacular   $(echo_if $(npm_package_is_installed gruntacular))"