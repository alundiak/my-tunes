import bubbleForCsv from './js/bubble_for_csv.js';
import bubbleForJson from './js/bubble_for_json.js';
import {iTunesDataToCamelCase} from './js/converters.js';

var funcFlareCsv = function(data) {
    // console.log(data);
    data.value = +data.value;
    if (data.value) return data;
};

var funcFlareJson = function(data) {
    console.log(data);
    // d.value = +d.value;
    var newData = {};

    data.children.forEach(function(d, i) {
        // console.log(d, i);
    });

    return data;
};

// works
// d3.csv("data/flare.csv", funcFlareCsv, function(error, tracksData) {
//     bubbleForCsv(error, tracksData);
// });

// works (but different look)
// d3.json("data/flare.json", function(error, tracksData) {
//     bubbleForJson(error, tracksData);
// });

// works - huge bubble with small circles.
// d3.csv("data/tracks.csv", iTunesDataToCamelCase, function(error, tracksData) {
//     bubbleForCsv(error, tracksData);
// });

// works - huge bubble with small circles.
// d3.tsv("data/tracks.tsv", iTunesDataToCamelCase, function(error, tracksData) {
//     bubbleForCsv(error, tracksData);
// });

d3.json("data/tracks.json", function(error, tracksData) {
    // 1 - convert iTunesData to camelCaseCustomData
    let camelCaseCustomData = tracksData.map(function(d, i) {
        return iTunesDataToCamelCase(d);
    });
    // 2 - convert camelCaseCustomData to regular hierarchyData (as flare.json)
    // maybe skip
    
    // 3 - convert hierarchyData to flattendHierarchyData
    // 
    
    var flattendHierarchyData = [];
    // 4 - pass it to bubbleForJson() to render    
    bubbleForJson(error, flattendHierarchyData);
});
