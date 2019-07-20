// This code is based on D3 Bubble example using csv:
// https://bl.ocks.org/mbostock/4063269
export default function (error, data) {
  if (error) throw error

  var svg = d3.select('svg')
  var width = +svg.attr('width')

  var format = d3.format(',d')

  var color = d3.scaleOrdinal(d3.schemeCategory20c)

  var pack = d3.pack()
    .size([width, width])
    .padding(1.5)

  // filter only those which don't have artworkCount
  var noArtWorkData = data.filter((el) => {
    return !el.artworkCount
  })

  if (!noArtWorkData.length) {
    console.log('All albums have artwork pictures.')
  } else {
    // TODO
    console.log(noArtWorkData)
  }

  var root = d3.hierarchy({
    children: data
  })
    .sum(function (d) {
      return d.value
    })
    .each(function (d) {
      // console.log(d.data);
      const id = d.data && d.data.id

      if (id) {
        // Track name with "." (ft. vs. pres.) or any dot "." in name will cut "class" (label to show on Bubble) in wrong way.
        // Example: "Beneath With Me V.3 (Extended Mix)" goes to "3 (Extended Mix)" as a class.
        // but what about "feat." and "vs." and "pres." in "Artist" or "Album Artist"
        // var i = id.lastIndexOf(".");

        var i = id.lastIndexOf(':') // AL: what if not split?
        // console.log(i);

        d.id = id // full path "Artist.Album.Name"
        d.package = id.slice(0, i) // "Artist.Album" node
        d.name = id.slice(0, i) // "Artist.Album" node

        d.class = id.slice(i + 1) // track "Name" - last item/child in flare chain
        d.className = id.slice(i + 1) // track "Name" - last item/child in flare chain

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

        !d.data.artworkCount && console.log(d.data)

        // if (!d.data.artworkCount){
        //     return d;
        // };
      }
    })

  var node = svg.selectAll('.node')
    .data(pack(root).leaves())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })

  node.append('circle')
    .attr('title', function (d) {
      // console.log(d);
    })
    .attr('id', function (d) {
      return d.id
    })
    .attr('r', function (d) {
      return d.r
    })
    .style('fill', function (d) {
      return color(d.package)
    })

  node.append('clipPath')
    .attr('id', function (d) {
      return 'clip-' + d.id
      // return "clip-" + d.data.trackId;
    })
    .append('use')
    .attr('xlink:href', function (d) {
      return '#' + d.id
      // return "#" + d.data.trackId;
    })

  node.append('text')
    .attr('clip-path', function (d) {
      // console.log(d);
      return 'url(#clip-' + d.id + ')'
      // AL: d.id is not ok to be at any level of HTML/CSS (in fact lot of different strings there)
      // return "url(#clip-" + d.id + ")";
      // // AL: d.id is not ok to be at any level of HTML/CSS (in fact lot of different strings there)

      // AL: Create onHover - show artwork or open new route
    })
    .selectAll('tspan')
    .data(function (d) {
      // console.log(d.class);
      return d.class.split(/(?=[A-Z][^A-Z])/g)
      // AL fix => https://gist.github.com/alundiak/e9d986182bd8c280033be29623e3a203
      // return (isNaN(d.class) && typeof d.class !== 'undefined') ? d.class.split(/(?=[A-Z][^A-Z])/g) : '';
    })
    .enter().append('tspan')
    .attr('x', 0)
    .attr('y', function (d, i, nodes) {
      return 13 + (i - nodes.length / 2 - 0.5) * 10
    })
    .text(function (d) {
      return d
    })

  node.append('title')
    .text(function (d) {
      return d.id + '\n' + format(d.value)
    })
}
