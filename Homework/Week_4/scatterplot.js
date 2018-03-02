// David van Schie, 10800999

function scatterplot() {
// Width and height of scatterplot
var width = 1000;
var height = 500;

// Values for padding
var paddingTop = 65;
var paddingSides = 120;

// The dot size will vary depending on population size
var dotDiameterScale = [3, 11];

var minValueColumn = function(data, column) {
    var min = Number.MAX_VALUE;
    data.forEach(function(d) {
        if (d[column] < min) {
            min = d[column];
        }
    });
    return min;
}
var maxValueColumn = function(data, column) {
    var max = Number.MIN_VALUE;
    data.forEach(function(d) {
        if (d[column] > max) {
            max = d[column];
        }
    });
    return max;
}

// D3 Colors
var color = d3.scale.category20();

var svg = d3.select("body").append("svg")
    .attr("width", width + paddingSides * 2)
    .attr("height", height + paddingTop * 2)
    .append("g")
    .attr("transform", "translate(" + paddingSides + "," + paddingTop + ")");

d3.csv("https://raw.githubusercontent.com/davidvschie/data_processing/master/Homework/Week_4/dataset.csv", function(error, data) {
    data.forEach(function(d) {
        d.Population = Number(d.Population);
        d.GDP_per_head = Number(d.GDP_per_head);
        d.Life_expectancy = Number(d.Life_expectancy);
    });

    var xScale = d3.scale.linear().range([0, width]);
    var xMap = function(d) {
        return xScale(d.Life_expectancy);
    };
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var minExpectancy = minValueColumn(data, "Life_expectancy");
    var maxExpectancy = maxValueColumn(data, "Life_expectancy");
    xScale.domain([minExpectancy - 3, maxExpectancy + 3]);

    var yScale = d3.scale.linear().range([height, 0]);
    var yMap = function(d) {
        return yScale(d.GDP_per_head);
    };
    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    var minIncome = minValueColumn(data, "GDP_per_head");
    var maxIncome = maxValueColumn(data, "GDP_per_head");
    yScale.domain([minIncome - 5000, maxIncome + 5000]);

    var zScale = d3.scale.linear().range(dotDiameterScale);
    var zMap = function(d) {
        return zScale(d.Population);
    };
    var minPopulation = minValueColumn(data, "Population");
    var maxPopulation = maxValueColumn(data, "Population");
    zScale.domain([minPopulation, maxPopulation])

    // Title 
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("font-family", "Helvetica")
        .style("font-size", "20px")
        .text("GDP, Life Expectancy and Population Size");

    // X-Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .attr("font-family", "Helvetica")
        .attr("font-size", "14px")
        .text("Life expectancy (Years)");

    // Y-Axis
    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "10px")
        .style("text-anchor", "end")
        .attr("font-family", "Helvetica")
        .attr("font-size", "14px")
        .text("GDP per head (USD)");

    // Draw the dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("cx", xMap)
        .attr("cy", yMap)
        .attr("r", zMap)
        .style("fill", function(d) {
            return color(d.Country);
        })

    // Draw the legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });

    // Draw text for legend
    legend.append("text")
        .attr("x", width - 50)
        .attr("y", 2)
        .attr("dy", "10px")
        .style("text-anchor", "start")
        .attr("font-family", "Helvetica")
        .text(function(d) {
            return d;
        })

    // Draw icons for legend
    legend.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("x", width - 74)
        .style("fill", color);

    // Draw circles for legend
    svg.append("circle")
        .attr("r", dotDiameterScale[0])
        .attr("cx", width - 68)
        .attr("cy", height - 90)
        .style("fill", "black");

    // Draw text for legend
    svg.append("text")
        .attr("x", width - 50)
        .attr("y", height - 87)
        .attr("font-family", "Helvetica")
        .text("Population: " + minPopulation);

    // Draw circles for legend
    svg.append("circle")
        .attr("r", dotDiameterScale[1])
        .attr("cx", width - 68)
        .attr("cy", height - 70)
        .style("fill", "black");

    // Draw text for legend
    svg.append("text")
        .attr("x", width - 50)
        .attr("y", height - 67)
        .attr("font-family", "Helvetica")
        .text("Population: " + maxPopulation);

});
}