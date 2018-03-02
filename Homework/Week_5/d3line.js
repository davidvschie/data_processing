// David van Schie, 10800999

function line(){
httpGetAsync("https://raw.githubusercontent.com/davidvschie/data_processing/master/Homework/Week_5/data.json",function(data){
	var parsed = JSON.parse(data);

	for (i in parsed) {
		console.log(parsed[i])
	}
})

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
}
