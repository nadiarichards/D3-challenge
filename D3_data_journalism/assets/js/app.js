const xValue = d => d.poverty;
const xLabel = "In Poverty (%)";
const yValue = d => d.healthcare;
const yLabel = "Lacks Healthcare (%)";

var margin = {top: 20, right: 30, bottom: 120, left: 120},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var chartGroup = svg.append("g")
    .attr("transform", `translate(" + margin.left + "," + margin.top + ")`);

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
  var xAxisG = chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', width / 2)
    .attr('y', 65)
    .text(xLabel);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([ height, 0]);
  var yAxisG = chartGroup.append("g")
    .call(d3.axisLeft(y))
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', -height / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

  // Add dots
  var circlesGroup = ChartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => { return x(d.poverty); })
        .attr("cy", d => { return y(d.healthcare); })
        .attr("r", 8)
        .style("fill", "rgb(143,194,217)")
        .attr("opacity", "0.7");

  var circleLabels = chartGroup.selectAll("text")
    .data(data)
    .enter()
    .append("text");

  circleLabels
    .attr("x", d => { return x(d.poverty); })
    .attr("y", fd => { return y(d.healthcare); })
    .text(function(d) {return d.abbr; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");
 
        
  // circlesGroup.append("text")
  //   .text(data => data.abbr)
  //   .attr("x", );
  //   .attr("y", )

  // var toolTip = d3.select("body")
  //   .append("div")
  //   .classed("tooltip", true);

  //   circlesGroup.on("mouseover", function(d) {
  //     toolTip.style("display", "block")
  //         .html(
  //           `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
  //       medal(s) won`)
  //         .style("left", d3.event.pageX + "px")
  //         .style("top", d3.event.pageY + "px");
  //   })
      // Step 3: Create "mouseout" event listener to hide tooltip
      // .on("mouseout", function() {
      //   toolTip.style("display", "none");
      // });

  // }).catch(function(error) {
  //   console.log(error);
});
// }

// var width = parseInt(d3.select("#scatter").style("width"));
// var height = width - width / 3.9;
// var margin = 20;
// var labelArea = 110;
// var tPadBot = 40;
// var tPadLeft = 40;
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("class", "chart");
// var circRadius;
// function crGet() {
//   if (width <= 530) {
//     circRadius = 5;
//   }
//   else {
//     circRadius = 10;
//   }
// }
// crGet();
// // A) Bottom Axis
// // ==============
// // We create a group element to nest our bottom axes labels.
// svg.append("g").attr("class", "xText");
// // xText will allows us to select the group without excess code.
// var xText = d3.select(".xText");
// // We give xText a transform property that places it at the bottom of the chart.
// // By nesting this attribute in a function, we can easily change the location of the label group
// // whenever the width of the window changes.
// function xTextRefresh() {
//   xText.attr(
//     "transform",
//     "translate(" +
//       ((width - labelArea) / 2 + labelArea) +
//       ", " +
//       (height - margin - tPadBot) +
//       ")"
//   );
// }
// xTextRefresh();
// // Now we use xText to append three text SVG files, with y coordinates specified to space out the values.
// // 1. Poverty
// xText
//   .append("text")
//   .attr("y", -26)
//   .attr("data-name", "poverty")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text("In Poverty (%)");
// // 2. Age
// xText
//   .append("text")
//   .attr("y", 0)
//   .attr("data-name", "age")
//   .attr("data-axis", "x")
//   .attr("class", "aText inactive x")
//   .text("Age (Median)");
// // 3. Income
// xText
//   .append("text")
//   .attr("y", 26)
//   .attr("data-name", "income")
//   .attr("data-axis", "x")
//   .attr("class", "aText inactive x")
//   .text("Household Income (Median)");
// // B) Left Axis
// // ============
// // Specifying the variables like this allows us to make our transform attributes more readable.
// var leftTextX = margin + tPadLeft;
// var leftTextY = (height + labelArea) / 2 - labelArea;
// // We add a second label group, this time for the axis left of the chart.
// svg.append("g").attr("class", "yText");
// // yText will allows us to select the group without excess code.
// var yText = d3.select(".yText");
// // Like before, we nest the group's transform attr in a function
// // to make changing it on window change an easy operation.
// function yTextRefresh() {
//   yText.attr(
//     "transform",
//     "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
//   );
// }
// yTextRefresh();
// // Now we append the text.
// // 1. Obesity
// yText
//   .append("text")
//   .attr("y", -26)
//   .attr("data-name", "obesity")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text("Obese (%)");
// // 2. Smokes
// yText
//   .append("text")
//   .attr("x", 0)
//   .attr("data-name", "smokes")
//   .attr("data-axis", "y")
//   .attr("class", "aText inactive y")
//   .text("Smokes (%)");
// // 3. Lacks Healthcare
// yText
//   .append("text")
//   .attr("y", 26)
//   .attr("data-name", "healthcare")
//   .attr("data-axis", "y")
//   .attr("class", "aText inactive y")
//   .text("Lacks Healthcare (%)");