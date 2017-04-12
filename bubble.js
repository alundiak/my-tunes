var svg = d3.select("svg"),
    width = +svg.attr("width");

var format = d3.format(",d");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([width, width])
    .padding(1.5);

var funcFlareCsv = function(d) {
    console.log(d);
    d.value = +d.value;
    if (d.value) return d;
};

var funcFlareJson = function(data) {
    console.log(data);
    // d.value = +d.value;
    var newData = {};

    data.children.forEach(function(d, i) {
        console.log(d, i);
    });

    return newData;
};

var funcTracksCsv = function(data) {
    // console.log(data;

    var newData = {}, separator = ":";
    
    // newData.id = data['Artist']; // if Artist is not applied, JS fails
    // newData.id = data['Album Artist']; // many empties in iTunes
    // newData.id = data['Album']; // a few empty albums
    // newData.id = data['Name'];
    // newData.id = data['Year'];
    // newData.id = '"' + data['Artist'] + '"."' + data['Album'] + '"."' + data['Name'] + '"';
    // newData.id = data['Artist'] + '.' + data['Album'] + '.' + data['Name'];
    // newData.id = data['Artist'] + separator + data['Artist'] + separator + data['Album'] + separator + data['Name'];
    newData.id = (data['Album Artist'] || '') + separator + data['Artist'] + separator + data['Album'] + separator + data['Name'];
    // console.log(newData.id);
    
    newData.size = +data['Size'];
    newData.value = +data['Size'];
    // newData.value = +data['Play Count'];
    newData.trackId = data['Track ID'];
    newData.name = data['Name'];
    newData.artist = data['Artist'];
    newData.albumArtist = data['Album Artist'];
    newData.album = data['Album'];
    newData.year = data['Year'];
    newData.genre = data['Genre'];
    newData.grouping = data['Grouping'];
    newData.bitRate = data['Bit Rate'];
    newData.playCount = +data['Play Count'];
    newData.artworkCount = data['Artwork Count'];
    newData.location = data['Location'];

    // Is not in CSV/TSV but only in JSON
    newData.trackCount = data['Track Count'];
    newData.composer = data['Composer']; 
    newData.bpm = data['BPM'];
    newData.comments = data['Comments'];
    newData.disabled = data['Disabled'];

    return newData;
};

var funcTracksJson = function(data) {
    console.log(data);
    var newData = {
        name: "Tracks",
        children: []
    };
    
    // d.id = d['Name'];
    // d.value = +d['Size'];

    data.forEach(function(d, i) {
        // console.log(d, i);

        newData.children.push({
            name: data["Album"],
            children: [{
                name: data["Name"],
                size: data["Size"]
            }]
        });
    });

    return newData;
};

// d3.csv("data/flare.csv", funcFlareCsv, function(error, classes) {
// d3.json("data/flare.json", funcFlareJson, function(error, classes) {
d3.csv("data/tracks.csv", funcTracksCsv, function(error, classes) {
// d3.json("data/tracks.json", funcTracksJson, function(error, classes) {

    if (error) throw error;

    var root = d3.hierarchy({
            children: classes
        })
        .sum(function(d) {
            return d.value;
        })
        .each(function(d) {
            // console.log(d.data);
            if (id = d.data.id) {

                var id;
                // Track name with "." (ft. vs. pres.) or any dot "." in name will cut "class" (label to show on Bubble) in wrong way. 
                // Example: "Beneath With Me V.3 (Extended Mix)" goes to "3 (Extended Mix)" as a class.
                // but what about "feat." and "vs." and "pres." in "Artist" or "Album Artist"
                // var i = id.lastIndexOf(".");
                
                var i = id.lastIndexOf(":"); // AL: what if not split?
                // console.log(i);

                d.id = id; // full path "Artist.Album.Name"
                d.package = id.slice(0, i); // "Artist.Album" node
                
                d.class = id.slice(i + 1); // track "Name" - last item/child in flare chain
                
                // d.class = "Track ID: " + d.data.trackId +
                // d.class = d.data.grouping;
                // d.class = d.data.genre;
                // d.class = d.data.bitRate;
                // d.class = d.data.year;
                // d.class = d.data.artworkCount;

                // not in CSV/TSV, but in JSON only
                // d.class =  "Track Count: " + d.data.trackCount;
                // d.class = d.data.composer;
                // d.class = d.data.bpm;

                !d.data.artworkCount && console.log(d.data);
            }
        });

    var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("circle")
        .attr("title", function(d){
            // console.log(d);
        })
        .attr("id", function(d) {
            return d.id;
        })
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d) {
            return color(d.package);
        });

    node.append("clipPath")
        .attr("id", function(d) {
            return "clip-" + d.id;
            // return "clip-" + d.data.trackId;
        })
        .append("use")
        .attr("xlink:href", function(d) {
            return "#" + d.id;
            // return "#" + d.data.trackId;
        });

    node.append("text")
        .attr("clip-path", function(d) {
            // console.log(d);
            return "url(#clip-" + d.id + ")"; // AL: d.id is not ok to be at any level of HTML/CSS (in fact lot of different strings there)
            // return "url(#clip-" + d.id + ")"; // AL: d.id is not ok to be at any level of HTML/CSS (in fact lot of different strings there)

            // AL: Create onHover - show artwork or open new route 
        })
        .selectAll("tspan")
        .data(function(d) {
            // console.log(d.class);
            return d.class.split(/(?=[A-Z][^A-Z])/g);
            // AL fix => https://gist.github.com/alundiak/e9d986182bd8c280033be29623e3a203
            // return (isNaN(d.class) && typeof d.class !== 'undefined') ? d.class.split(/(?=[A-Z][^A-Z])/g) : '';
        })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) {
            return 13 + (i - nodes.length / 2 - 0.5) * 10;
        })
        .text(function(d) {
            return d;
        });

    node.append("title")
        .text(function(d) {
            return d.id + "\n" + format(d.value);
        });
});
