#!/bin/bash
rm -rf ./dist/**
mkdir ./dist/
mkdir ./dist/js/
mkdir ./dist/css/
mkdir ./dist/data/
cp ./circle_pack_zoomed.html ./dist/index.html
cp ./css/circle_pack_zoomed.css ./dist/css/
cp ./js/circle_pack_zoomed.js ./dist/js
cp ./js/converters.js ./dist/js/
cp ./data/tracks.json ./dist/data/
