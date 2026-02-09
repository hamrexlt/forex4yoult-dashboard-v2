#!/usr/bin/env bash

# exit on error
set -o errexit

# npm i --legacy-peer-deps
bun install
node ace build --ignore-ts-errors --assets
cd build
echo "RUNNING CI..."
# npm ci --legacy-peer-deps
bun install --production
echo "RUNNING MIGRATION"
# ENV_PATH=/etc/secrets/.env
# node ace migration:run --force
echo "GOING OUT OF BUILD"
cd ..
