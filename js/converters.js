/**
 * Convert iTunes data format from csv/json to simplified data.
 * @return {[Array]}
 */
export function iTunesDataToCamelCase(data) {
    // console.log(data);
    var newData = {},
        separator = ":";

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

    return newData; // => iTunesDataSimplified
};

export function convertItunesDataToFlattendChildrenData(iTunesDataSimplified) {
    console.log(iTunesDataSimplified);
    var newData = {
        name: "Tracks",
        children: []
    };
    
    // d.id = d['Name'];
    // d.value = +d['Size'];

    iTunesDataSimplified.forEach(function(d, i) {
        // console.log(d, i);

        newData.children.push({
            name: data["Album"],
            children: [{
                name: data["Name"],
                size: data["Size"]
            }]
        });
    });

    return newData || data;
};

export function convertItunesDataToDeepChildrenData(data){ // TODO
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
