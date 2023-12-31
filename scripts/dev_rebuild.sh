#!/bin/bash

docker compose --env-file ./api/.env \
    --env-file ./client/.env build \
    --no-cache \
    #--progress=plain \