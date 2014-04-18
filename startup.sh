#!/bin/bash

# Exports the heroku config needed to run this app with remote resources.
# Usage: $ source env.sh

config_vars=( MONGOHQ_URL BONSAI_URL )
for env_var in "${config_vars[@]}"
do
  es_config=`heroku config | grep $env_var | tr -d ' ' | sed "s/^$env_var://g"`
  echo "export $env_var=$es_config"
  export $env_var=$es_config
done

node app.js
