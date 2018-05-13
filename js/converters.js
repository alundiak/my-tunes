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
    // newData.value = +data['Size'];
    newData.value = +data['Play Count'];
    // newData.value = +data['Year'];
    // newData.value = +data['Bit Rate'];
    
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

// TODO
// Rework this using BinaryTreeNode as on LeetCode
// TODO
/**
 * [convertItunesDataToFlareData description]
 * @param  {[Array]} data raw iTunesData
 * @return {[Array]} converted, flare/hierarchy data: 
 * "MyTracks \ "Artist" \ "Album" \ { "Name" (aka name), "Play Count" (aka value) }
 */
export function convertItunesDataToFlareData(data) {
    var newData = {
        name: "Albums By Artists",
        children: []
    };

    data.forEach(function(d, i) { 
        let foundArtist = newData.children.find((artistObj) => {
            return artistObj.name === d.artist;
        });

        if (foundArtist){
        	let foundAlbum = foundArtist.children.find((albumObj) => {
        		return albumObj.name === d.album;	
        	});
        	if (foundAlbum){
        		foundAlbum.children.push({
	                name: d.name || 'track name not found',
	                // size: d.size,
	                // size: d.playCount || 0,
	                value: d.playCount || 0 // last in chain, so we need value/playCount
	            });
        	} else {
        		foundArtist.children.push({
	                name: d.album || 'album name not found',
	                // size: d.size,
	                // size: d.playCount || 0,
	                // value: d.playCount || 0, // maybe just 0
	                children: [
                    	{
                    		name: d.name || 'track name not found',
                    		value: d.playCount || 0 // maybe just 0
                    	}
                    ]
	            });
        	}
        } else { // unique artist entry
        	newData.children.push({
	            name: d.artist || 'artist name not found',
	            children:[
	                {
	                    name: d.album || 'album name not found',
	                    children: [
	                    	{
	                    		name: d.name || 'track name not found',
	                    		value: d.playCount || 0 // maybe just 0
	                    	}
	                    ]
	                    // size: d.size,
	                    // size: d.playCount || 0, // to follow flattenedHierarchy() function code. But not sure if needed.
	                    // value: d.playCount || 0 // maybe just 0
	                }
	            ]
	        });
        }
    });

    return newData || data;
};

// Only root level - Tracks !!!
export function convertItunesDataToFlattendChildrenData(iTunesDataSimplified) {
    var newData = {
        name: "Albums By Artists",
        children: []
    };

    iTunesDataSimplified.forEach(function(d, i) { 
        newData.children.push({
            name: d.album,
            children:[
                {
                    name: d.name || 'name not found - correct track info',
                    // size: d.size,
                    size: d.playCount || 0,
                    value: d.playCount || 0
                }
            ]
        });
    });

    return newData || iTunesDataSimplified;
};

//
// FOR BUBBLE ONLY !!! - if new logic needed, create separate function
// 
// Returns a flattened hierarchy containing all leaf nodes under the root.
// Looks like TreeNode / ListNode (similar to as in leetcode - https://leetcode.com/problems/add-two-numbers/description/)
// Code taken from https://bl.ocks.org/john-guerra/0d81ccfd24578d5d563c55e785b3b40a and reworked
export function flattenedHierarchy(hierarchyData) {
    console.log('Initial data structure', hierarchyData);
    var childrenData = [];

    function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) {
            recurse(node.name, child);
        });
        else childrenData.push({
            packageName: name,
            className: node.name,
            value: node.size
        });
    }

    recurse(null, hierarchyData);

    let convertedData = {
        children: childrenData
    };
    console.log('Converted data structure', convertedData);

    return convertedData;
}
