#!/bin/bash

set -m
set -euo pipefail

exec "$@" &

sleep 1

if [[ "$(garage layout show | tail -n 1 | awk '{print $5}')" == "0" ]]; then
  NODE_ID=$(garage status | sed '3q;d' | awk '{print $1}')
  garage layout assign -z dc1 -c 1G $NODE_ID
  garage layout apply --version 1
fi

if [[ $(garage bucket list | wc -l) -lt 2 ]]; then
  garage bucket create www

  API_KEY=$(garage key create www-key | sed '4q;d' | awk '{print $3}')
  echo $API_KEY >/tmp/api-keys/storage-www
  garage bucket allow --read --write --owner www --key www-key
fi

cleanup() {
  kill -SIGINT %1
}
trap cleanup SIGTERM SIGINT

wait -n
