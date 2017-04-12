var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");

var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

var parseData = function(data) {
    // console.log(data);
    // var newData = {
    //     name: "Albums By Artists",
    //     children: []
    // };

    // data.forEach(function(d, i) { 
    //     // console.log(d, i); 

    //     newData.children.push({
    //         name: data["Album"],
    //         children:[
    //             {
    //                 name: data["Name"],
    //                 size: data["Size"]
    //             }
    //         ]
    //     });
    // });

    // MyTracks \ "Album Artist" \ "Album" \ "Name" (of track), "Size" (of track)
    var newData = {
        name: "MyTracks",
        children: [
            {
                name: "Eric Prydz",
                children: [
                    {
                        name: "Album 1", 
                        children: [
                            {name: "Song 2", size: 1080}
                        ]
                    },
                    {
                        name: "Album 2", 
                        children: [
                            {
                                name: "Song 1", 
                                size: 1075
                            },
                            {name: "Song 3", size: 1085},
                            {name: "Song 4", size: 1090}
                        ]
                    }
                ]
            },
            {
                name: "Above and Beyond",
                children: [
                    {
                        name: "Album A", 
                        children: [
                            {name: "Song A.1", "size": 1082},
                            {name: "Song A.1", "size": 1082},
                            {name: "Song A.1", "size": 2082},
                            {name: "Song A.1", "size": 4082}
                        ]
                    },
                    {
                        name: "Album B", 
                        children: [
                            // {name: "Song B.1", "size": 1082},
                            {name: "Song B.2", "size": 1082}
                        ]
                    }
                ]
            }
        ]            
    };


    return newData || data;
}

// d3.json("data/flare.json", function(error, root) {

d3.json("data/tracks.json", function(error, root) {
    root = parseData(root);

    if (error) throw error;

    root = d3.hierarchy(root)
        .sum(function(d) {
            // console.log(d);
            return d.size;
        })
        .sort(function(a, b) {
            return b.value - a.value;
        })
        .each(function(d) {
            // console.log(d);
        });

// console.log(pack(root).descendants());
    var node = g.selectAll(".node")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function(d) {
            return d.children ? "node" : "leaf node";
        })
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data.name + "\n" + format(d.value);
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        });

    node.filter(function(d) {
            // console.log(d);
            return !d.children;
        }).append("text")
        .attr("dy", "0.3em")
        .text(function(d) {
            return d.data.name.substring(0, d.r / 3);
        });
});
