#!/usr/bin/env bash

docker rmi $(docker images -f dangling=true -q)

docker rmi $(docker images -a -q) -f

docker rmi $(docker images -a -q)