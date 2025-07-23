#!/bin/bash
rm -rf ./dist/**

mkdir -p ./dist/js/
mkdir -p ./dist/css/
mkdir -p ./dist/data/

cp ./circle_pack_zoomed.html ./dist/index.html
cp ./circle_pack_zoomed.css ./dist/css/
cp ./circle_pack_zoomed.js ./dist/js

cp ./common.js ./dist/js/

cp ./tracks.json ./dist/data/
