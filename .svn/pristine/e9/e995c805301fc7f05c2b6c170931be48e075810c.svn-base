var weatherRetrieval = require('../src/weatherRetrieval.js');

var errorFunction = function(error) {
	console.log("Oops..Error occurred while reading file" + error);
}

var printResultFunction = function(result) {
	var printElements = function(element) { 
		if(element.length === 3){
			console.log(element[0] + ", " + element[1] + ", " + element[2]); 
		}
	}

	console.log("City, State, Temperature");
	result.forEach(printElements);
}

weatherRetrieval.getWeatherForCities(process.argv.slice(2)[0], errorFunction, printResultFunction);