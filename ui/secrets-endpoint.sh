#!/usr/bin/env bash

# Load the S3 secrets file contents into the environment variables
eval $(aws s3 cp s3://wc-ecs-secrets/website_secrets.txt - | sed 's/^/export /')

exec "$@"