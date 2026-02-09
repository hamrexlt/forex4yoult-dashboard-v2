#!/usr/bin/env bash

# exit on error
set -o errexit

cd build
# Start server
ENV_PATH=/etc/secrets/.env node ./bin/server.js --no-assets
