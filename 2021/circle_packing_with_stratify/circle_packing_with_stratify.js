const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const format = d3.format(",d");

const color = d3.scaleSequential(d3.interpolateMagma).domain([-4, 4]);

const stratify = d3.stratify().parentId(function (d) {
  return d.id.substring(0, d.id.lastIndexOf("."));
});

const pack = d3
  .pack()
  .size([width - 2, height - 2])
  .padding(3);

// d3.csv("data/tracks.csv", function(error, data) { // doesn't work because not flare-data-structure
d3.csv("flare.csv", function (error, data) {
  // maybe needed on real server to be from root /
  // d3.csv('../data/flare.csv', function (error, data) {
  // d3.csv("data/flare.json", function(error, data) {
  if (error) throw error;

  const root = stratify(data)
    // var root = d3.hierarchy(data)
    .sum(function (d) {
      return d.value;
    })
    .sort(function (a, b) {
      return b.value - a.value;
    });

  pack(root);

  const node = svg
    .select("g")
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .attr("class", function (d) {
      return (
        "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root")
      );
    })
    .each(function (d) {
      d.node = this;
    })
    .on("mouseover", hovered(true))
    .on("mouseout", hovered(false));

  node
    .append("circle")
    .attr("id", function (d) {
      return "node-" + d.id;
    })
    .attr("r", function (d) {
      return d.r;
    })
    .style("fill", function (d) {
      return color(d.depth);
    });

  const leaf = node.filter(function (d) {
    return !d.children;
  });

  leaf
    .append("clipPath")
    .attr("id", function (d) {
      return "clip-" + d.id;
    })
    .append("use")
    .attr("xlink:href", function (d) {
      return "#node-" + d.id + "";
    });

  leaf
    .append("text")
    .attr("clip-path", function (d) {
      return "url(#clip-" + d.id + ")";
    })
    .selectAll("tspan")
    .data(function (d) {
      return d.id
        .substring(d.id.lastIndexOf(".") + 1)
        .split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append("tspan")
    .attr("x", 0)
    .attr("y", function (d, i, nodes) {
      return 13 + (i - nodes.length / 2 - 0.5) * 10;
    })
    .text(function (d) {
      return d;
    });

  node.append("title").text(function (d) {
    return d.id + "\n" + format(d.value);
  });
});

function hovered(hover) {
  return function (d) {
    d3.selectAll(
      d.ancestors().map(function (d) {
        return d.node;
      })
    ).classed("node--hover", hover);
  };
}
