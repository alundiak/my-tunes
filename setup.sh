#!/bin/bash

# FILE=~/Music/iTunes/iTunes\ Media\ Library.xml # Yosemite, el Capitan (not sure)
FILE=~/Music/iTunes/iTunes\ Music\ Library.xml # Sierra (at least for me)
# FILE="./Library.xml"

# https://github.com/shawnbot/itunes-data/issues/13
./node_modules/.bin/itunes-data --tracks data/tracks.csv "$FILE"
./node_modules/.bin/itunes-data --tracks data/tracks.tsv "$FILE"
./node_modules/.bin/itunes-data --tracks data/tracks.json "$FILE"

# itunes-data --artists data/artists.csv "$FILE"
# itunes-data --artists data/artists.tsv "$FILE"
# itunes-data --artists data/artists.json "$FILE"

# itunes-data --albums data/albums.csv "$FILE"
# itunes-data --albums data/albums.tsv "$FILE"
# itunes-data --albums data/albums.json "$FILE"

# # # https://github.com/shawnbot/itunes-data/issues/8
# itunes-data --library library.json "$FILE" 
# itunes-data --library library.tsv "$FILE"
# itunes-data --library library.csv "$FILE"


# # # https://github.com/shawnbot/itunes-data/issues/10
# itunes-data --playlists data/playlists.json "$FILE"
# itunes-data --playlists data/playlists.csv "$FILE"
# itunes-data --playlists data/playlists.tsv "$FILE"

# # # https://github.com/shawnbot/itunes-data/issues/11
# itunes-data --tracks --format json "$FILE" > data/tracks_1.json
# itunes-data --tracks --format tsv "$FILE" > data/tracks_2.tsv
# itunes-data --tracks --format csv "$FILE" > data/tracks_3.csv

