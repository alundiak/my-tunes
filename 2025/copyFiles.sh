#!/bin/bash
cd "$(dirname "$0")"

rm -rf ./dist/**

mkdir -p ./dist/data/

cp ./index.html ./2025.css ./2025.js ./dist/

cp ./common.js ./dist/

cp ./data/tracks-2025.json ./dist/data/tracks-2025.json
