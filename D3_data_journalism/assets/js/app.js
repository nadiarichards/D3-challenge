const xValue = d => d.poverty;
const xLabel = "In Poverty (%)";
const yValue = d => d.healthcare;
const yLabel = "Lacks Healthcare (%)";

var margin = {top: 20, right: 30, bottom: 60, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("assets/data/data.csv").then (function(data) {

    console.log(data);

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([ 0, width ]);
  var xAxisG = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
//   xAxisG.append('text')
//     .attr('class', 'axis-label')
//     .attr('x', innerWidth / 2)
//     .attr('y', 100)
//     .text(xLabel);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([ height, 0]);
  var yAxisG = svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.healthcare); } )
        .attr("r", 5)
        .style("fill", "lightblue")
});