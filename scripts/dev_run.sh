#!/bin/bash
docker compose --env-file ./api/.env --env-file ./client/.env up --build
