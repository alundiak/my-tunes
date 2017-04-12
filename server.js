var fs = require("fs"),
    itunes = require("itunes-data"),
    parser = itunes.parser(),
    stream = fs.createReadStream("path/to/iTunes Media Library.xml");

parser.on("track", function(track) {
    console.log("track:", track);
});

parser.on("album", function(album) {
    console.log("album:", track);
});

stream.pipe(parser);
