import bubbleForCsv from './bubble_for_csv.js';
import bubbleForJson from './bubble_for_json.js';
import {
  iTunesDataToCamelCase,
  convertItunesDataToFlareData,
  convertItunesDataToFlattendChildrenData,
  flattenedHierarchy
} from './converters.js';

const funcFlareCsv = function (data) {
  // console.log(data);
  data.value = +data.value;
  if (data.value) return data;
};

// works
// d3.csv("data/flare.csv", funcFlareCsv, function(error, tracksData) {
//     bubbleForCsv(error, tracksData);
// });

// works (but different look)
// d3.json("data/flare.json", function(error, tracksData) {
//     bubbleForJson(error, flattenedHierarchy(tracksData));
// });

// works - huge bubble with small circles.
d3.csv('data/tracks.csv', iTunesDataToCamelCase, function (error, tracksData) {
  bubbleForCsv(error, tracksData);
});

// works - huge bubble with small circles.
// d3.tsv("data/tracks.tsv", iTunesDataToCamelCase, function(error, tracksData) {
//     bubbleForCsv(error, tracksData);
// });

// d3.json("data/tracks.json", function(error, tracksData) {
//     // 1 - convert iTunesData to camelCaseCustomData
//     let camelCaseCustomData = tracksData.map(function(d, i) {
//         return iTunesDataToCamelCase(d);
//     });

//     // 2 - convert camelCaseCustomData to regularHierarchyData (as flare.json)
//     // var regularHierarchyData = convertItunesDataToFlattendChildrenData(camelCaseCustomData); // it's already flatten structure
//     var regularHierarchyData = convertItunesDataToFlareData(camelCaseCustomData);

//     // 3 - convert regularHierarchyData to flattendHierarchyData
//     var flattendHierarchyData = flattenedHierarchy(regularHierarchyData); // build packageName, className, value structure.

//     // 4 - pass it to bubbleForJson() to render
//     bubbleForJson(error, flattendHierarchyData);
//     // bubbleForCsv(error, regularHierarchyData); // doesn't work
// });
