// https://bl.ocks.org/mbostock/7607535
// https://gist.github.com/mbostock/7607535
import {
  iTunesDataToCamelCase,
  convertItunesDataToFlareData,
} from "../../2025/common.js";

const DATA_FILE = "./data/tracks-2023.json";

const svg = d3.select("svg");
const margin = 20;
const diameter = +svg.attr("width");
const g = svg
  .append("g")
  .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

const color = d3
  .scaleLinear()
  .domain([-1, 5])
  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
  .interpolate(d3.interpolateHcl);

const pack = d3
  .pack()
  .size([diameter - margin, diameter - margin])
  .padding(2);

d3.json(DATA_FILE, function (error, iTunesData) {
  let tracksData = iTunesData.map(function (d, i) {
    return iTunesDataToCamelCase(d);
  });

  // filter only those which don't have artworkCount
  const noArtWorkData = tracksData.filter((el) => {
    return !el.artworkCount;
  });

  if (tracksData.length > 0) {
    // console.log(tracksData); // so that I can see info in console.
    tracksData = convertItunesDataToFlareData(tracksData);
  }

  if (!noArtWorkData.length) {
    console.log("All albums have artwork pictures.");
  } else {
    console.log(
      `These tracks seems to be with 'artworkCount: undefined' -
        you added artwork to all tracks as selected multiple, so it may have added to first in album only.`,
      noArtWorkData
    );
  }

  // console.log(JSON.stringify(tracksData, null, 2));

  if (error) throw error;

  const root = d3
    .hierarchy(tracksData)
    .sum(function (d) {
      // return d.size;
      return d.value;
    })
    .sort(function (a, b) {
      return b.value - a.value;
    });

  let focus = root;
  const nodes = pack(root).descendants();
  let view;

  const circle = g
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", function (d) {
      return d.parent
        ? d.children
          ? "node"
          : "node node--leaf"
        : "node node--root";
    })
    .style("fill", function (d) {
      return d.children ? color(d.depth) : null;
    })
    .on("click", function (d) {
      if (focus !== d) zoom(d), d3.event.stopPropagation();
    });

  const text = g
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("fill-opacity", function (d) {
      return d.parent === root ? 1 : 0;
    })
    .style("display", function (d) {
      return d.parent === root ? "inline" : "none";
    })
    .text(function (d) {
      return d.data.name;
    });

  const node = g.selectAll("circle,text");

  svg.style("background", color(-1)).on("click", function () {
    zoom(root);
  });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    const focus0 = focus;
    focus = d;

    const transition = d3
      .transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .tween("zoom", function (d) {
        const i = d3.interpolateZoom(view, [
          focus.x,
          focus.y,
          focus.r * 2 + margin,
        ]);
        return function (t) {
          zoomTo(i(t));
        };
      });

    transition
      .selectAll("text")
      .filter(function (d) {
        return d.parent === focus || this.style.display === "inline";
      })
      .style("fill-opacity", function (d) {
        return d.parent === focus ? 1 : 0;
      })
      .on("start", function (d) {
        if (d.parent === focus) this.style.display = "inline";
      })
      .on("end", function (d) {
        if (d.parent !== focus) this.style.display = "none";
      });
  }

  function zoomTo(v) {
    const k = diameter / v[2];
    view = v;
    node.attr("transform", function (d) {
      return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
    });
    circle.attr("r", function (d) {
      return d.r * k;
    });
  }
});
