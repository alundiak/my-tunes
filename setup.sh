#!/bin/bash

# FILE=~/Music/iTunes/iTunes\ Media\ Library.xml # Yosemite, el Capitan (not sure)
# FILE=~/Music/iTunes/iTunes\ Music\ Library.xml # Sierra (at least for me) on MacBook Pro
FILE=~/Music/Music/Media.localized/Library.xml # Monterey on iMac
# FILE="./Library.xml"

# Issue with tsv/csv
# https://github.com/shawnbot/itunes-data/issues/15

# https://github.com/shawnbot/itunes-data/issues/13
./node_modules/.bin/itunes-data --tracks data/tracks.csv "$FILE" # doens't work with fast-csv@0.4.0
./node_modules/.bin/itunes-data --tracks data/tracks.tsv "$FILE" # doens't work with fast-csv@0.4.0
./node_modules/.bin/itunes-data --tracks data/tracks.json "$FILE"

# ./node_modules/.bin/itunes-data --artists data/artists.csv "$FILE" # doens't work with fast-csv@0.4.0
# ./node_modules/.bin/itunes-data --artists data/artists.tsv "$FILE" # doens't work with fast-csv@0.4.0
# ./node_modules/.bin/itunes-data --artists data/artists.json "$FILE"

# ./node_modules/.bin/itunes-data --albums data/albums.csv "$FILE" doens't work EVEN with fast-csv@0.6.0
# ./node_modules/.bin/itunes-data --albums data/albums.tsv "$FILE"
# ./node_modules/.bin/itunes-data --albums data/albums.json "$FILE"

# # # https://github.com/shawnbot/itunes-data/issues/8
# ./node_modules/.bin/itunes-data --library library.json "$FILE"
# ./node_modules/.bin/itunes-data --library library.tsv "$FILE"
# ./node_modules/.bin/itunes-data --library library.csv "$FILE"


# # # https://github.com/shawnbot/itunes-data/issues/10
# ./node_modules/.bin/itunes-data --playlists data/playlists.json "$FILE"
# ./node_modules/.bin/itunes-data --playlists data/playlists.csv "$FILE"
# ./node_modules/.bin/itunes-data --playlists data/playlists.tsv "$FILE"

# # # https://github.com/shawnbot/itunes-data/issues/11
# ./node_modules/.bin/itunes-data --tracks --format json "$FILE" > data/tracks_2.json
# ./node_modules/.bin/itunes-data --tracks --format tsv "$FILE" > data/tracks_2.tsv
# ./node_modules/.bin/itunes-data --tracks --format csv "$FILE" > data/tracks_3.csv

