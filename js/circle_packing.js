//
// heavily based on old example for simple circle packing
// https://strongriley.github.io/d3/ex/pack.html
//
import { iTunesDataToCamelCase, convertItunesDataToFlareData, flattenedHierarchy } from './converters.js';

const svg = d3.select('svg');
const diameter = +svg.attr('width');
const g = svg.append('g').attr('transform', 'translate(2,2)');
const format = d3.format(',d');

const pack = d3.pack()
  .size([diameter - 4, diameter - 4]);

const funcFlareCsv = function (data) {
  // console.log(data);
  data.name = data.id;
  data.value = +data.value;
  if (data.value) return data;
};

// doesn't work
// d3.csv("data/flare.csv", funcFlareCsv, function(error, tracksData) {

// works
// d3.json("data/flare.json", function(error, tracksData) {

// doesn't work = wrong data structure
// d3.csv("data/tracks.csv", iTunesDataToCamelCase, function(error, tracksData) {

// doesn't work = wrong data structure
d3.json('data/tracks.json', function (error, iTunesData) {
  let tracksData = iTunesData.map(function (d, i) {
    return iTunesDataToCamelCase(d);
  });
  tracksData = convertItunesDataToFlareData(tracksData);

  // tracksData = flattenedHierarchy(tracksData); // no need for circle_packing.js

  if (error) throw error;

  const root = d3.hierarchy(tracksData)
    .sum(function (d) {
      // console.log(d);
      // return d.size;
      return d.value;
    })
    .sort(function (a, b) {
      return b.value - a.value;
    })
    .each(function (d) {
      // console.log(d);
    });

  // console.log(pack(root).descendants());
  const node = g.selectAll('.node')
    .data(pack(root).descendants())
    .enter().append('g')
    .attr('class', function (d) {
      return d.children ? 'node' : 'leaf node';
    })
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

  node.append('title')
    .text(function (d) {
      return d.data.name + '\n' + format(d.value);
    });

  node.append('circle')
    .attr('r', function (d) {
      return d.r;
    });

  node.filter(function (d) {
    // console.log(d);
    return !d.children;
  }).append('text')
    .attr('dy', '0.3em')
    .text(function (d) {
      const val = d.data.name.substring(0, d.r / 3);
      // console.log(val);
      return val;
    });
});
