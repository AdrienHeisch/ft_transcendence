#!/bin/bash

set -m
set -euo pipefail

exec "$@" &

sleep 1

if [[ "$(garage layout show | tail -n 1 | awk '{printf $5}')" == "0" ]]; then
  NODE_ID=$(garage status | sed '3q;d' | awk '{printf $1}')
  garage layout assign -z dc1 -c 1G $NODE_ID
  garage layout apply --version 1
fi

if [[ $(garage bucket list | wc -l) -lt 2 ]]; then
  KEY_NAME=www-key
  garage key create $KEY_NAME
  API_KEY_ID=$(garage key list | sed '2q;d' | awk '{printf $1}')
  garage key info $API_KEY_ID | sed '2q;d' | awk '{printf $3}' >/tmp/api-keys/storage-id
  garage key info $API_KEY_ID --show-secret | sed '4q;d' | awk '{printf $3}' >/tmp/api-keys/storage-secret

  garage bucket create public
  garage bucket allow --read --write --owner public --key $KEY_NAME
  garage bucket website --allow public
fi

cleanup() {
  kill -SIGINT %1
}
trap cleanup SIGTERM SIGINT

wait -n
