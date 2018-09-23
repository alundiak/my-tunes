const lib = '/Users/alund/Music/iTunes/iTunes Music Library.xml'; // Yes just use " " - space, no "/".

const fs = require('fs');
const http2 = require('http2');
const path = require('path');
const itunes = require('itunes-data');
const parser = itunes.parser();
const readStream = fs.createReadStream(path.resolve(lib));
// console.log(stream); // works.

parser.on('track', function(track) {
    console.log("track:", track);
});

// parser.on('artist', function(artist) {
//     console.log("artist:", artist);
// });

// parser.on('album', function(album) {
//     console.log("album:", album);
// });

// parser.on('playlist', function(playlist) {
//     console.log("playlist:", playlist);
// });

// parser.on('library', function(library) {
//     console.log("library:", library);
// });

readStream.pipe(parser); // server starts, but then on page refresh an error.
//
// But how to maintain streaming ?
// By default, it should not throw an event, but it does. Bug?
// 

//
// HTTP/2 Server using NodeJS and HTTP2 API
//
// https://nodejs.org/api/http2.html#http2_http_2

// const server = http2.createServer(); // doesn't work
const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (httpStream, headers) => {
    // httpStream is a Duplex

    // TODO code here

    // console.log('READ STREAM', readStream);
    // console.log('HTTP STREAM', httpStream);

    httpStream.respond({
        'content-type': 'text/html',
        ':status': 200
    });
    httpStream.end('<h1>Hello World</h1>');
});

server.listen(8443);
