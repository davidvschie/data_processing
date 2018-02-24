// Parse JSON to use in bar chart
// I am using a http request as I find this has more practical use than reading in local data with d3.json
httpGetAsync("https://raw.githubusercontent.com/davidvschie/data_processing/master/Homework/Week_3/data.json",function(data){
	var parsed = JSON.parse(data);
	createBarChart(parsed);	
})

function createBarChart(data){

	// Width and Height of chart
	var width = 1000;
	var height = 350;

	// Values for padding the text
	tPadding1 = 16
	tPadding2 = 15
	tPadding3 = 10
	tPadding4 = 315

	var chart = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

	// Draw the bars
	chart.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", (d, i) => {return i * (width / data.length)})
		.attr("y", (d) => {return height - (d.Temp)})
		.attr("width", width / data.length - 1)
		.attr("height", (d) => {return d.Temp;})
		.on("mouseover", onMouseOver)                  
		.on("mouseout", onMouseOut)
		.attr("fill", "lightcoral")

	// Temperatures should be shown near top of bars
	chart.selectAll("text.temp")
		.data(data)
	    .enter()
	    .append("text")
	    .text((d) => {return d.Temp})	
	    .attr("x", (d, i) => {return i * (width / data.length) + tPadding1}) 
	    .attr("y", (d) => {return height - (d.Temp) + tPadding2})
	    .attr("font-family", "Helvetica")
	    .attr("font-size", "8px")
	    .attr("fill", "white")
	    .attr("text-anchor", "middle")

	// Days should be shown above all bars
	chart.selectAll("text.date")
		.data(data)
	    .enter()
	    .append("text")
	    .text((d) => {return d.Date})
	    .attr("x", (d, i) => {return i * (width / data.length) + tPadding3}) 
	    .attr("y", (d) => {return height - tPadding4})
	    .attr("font-family", "Helvetica")
	    .attr("font-size", "9px")
	    .attr("fill", "black")
}

// Code for asynchronous HTTP get request taken from 
// https://stackoverflow.com/questions/247483/http-get-request-in-javascript
function httpGetAsync(URL, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}

// Colour of bars should change when mouse hovers over them
function onMouseOver(d)
{
  	d3.select(this).attr("fill", "tomato");
}

// Colour of bars should change back when mouse is gone
function onMouseOut(d)
{
	d3.select(this).attr("fill", "lightcoral");
}