# Outdated version

Was designed to run script `./setup.sh`, which referred to NodeJS package `itunes-data` to convert XML data into JSON file.

Then running `http-server` to look on music tracks which require some changes (missed artwork, missed artist name, missed album name, etc.)

Because [itunes-data](https://github.com/shawnbot/itunes-data/) is very outdated this code simply DOES NOT work now (`node-expat` + `node-gyp` code errors)
