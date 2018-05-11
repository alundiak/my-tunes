var fs = require("fs"),
    itunes = require("itunes-data"),
    parser = itunes.parser(),
    stream = fs.createReadStream("~/Music/iTunes/iTunes\ Music\ Library.xml");
    // stream = fs.createReadStream("file:///Users/alund/Music/iTunes/iTunes%20Music%20Library.xml");

parser.on("track", function(track) {
    console.log("track:", track);
});

parser.on("album", function(album) {
    console.log("album:", track);
});

stream.pipe(parser);
