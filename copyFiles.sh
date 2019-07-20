#!/bin/bash
rm -rf ./dist/**
mkdir ./dist/js/
mkdir ./dist/data/
cp ./circle_pack_zoomed.html ./dist/index.html
cp ./circle_pack_zoomed.css ./dist/
cp ./circle_pack_zoomed.js ./dist/
cp ./js/converters.js ./dist/js/
cp ./data/tracks.json ./dist/data/