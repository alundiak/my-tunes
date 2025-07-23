//
// This code based on forked version of D# Bubble example
// but now using d3.json https://bl.ocks.org/john-guerra/0d81ccfd24578d5d563c55e785b3b40a
//
export default function (error, data) {
  if (error) throw error;

  const diameter = 960;
  const format = d3.format(',d');
  const color = d3.scaleOrdinal(d3.schemeCategory20c);

  const bubble = d3.pack()
    .size([diameter, diameter])
    .padding(1.5);

  // var svg = d3.select("body").append("svg")
  const svg = d3.select('svg')
  // .attr("width", diameter)
  // .attr("height", diameter)
    .attr('class', 'bubble');

  const root = d3.hierarchy(data)
    .sum(function (d) {
      return d.value;
    })
    .sort(function (a, b) {
      return b.value - a.value;
    });

  bubble(root);
  const node = svg.selectAll('.node')
    .data(root.children)
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

  node.append('title')
    .text(function (d) {
      return d.data.className + ': ' + format(d.value);
    });

  node.append('circle')
    .attr('r', function (d) {
      return d.r;
    })
    .style('fill', function (d) {
      return color(d.data.packageName);
    });

  node.append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .text(function (d) {
      // console.log(d);
      return d.data.className.substring(0, d.r / 3);
    });

  d3.select(self.frameElement).style('height', diameter + 'px');
}
