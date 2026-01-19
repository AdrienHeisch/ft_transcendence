#!/bin/bash

bun db:push
bun db:setup

exec "$@"
