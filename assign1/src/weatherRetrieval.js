"use strict";
var fs = require('fs');
var path = require('path');
var http = require("http");
var XmlDocument = require('xmldoc').XmlDocument;
	
exports.readFileIntoString = function(filename, callbackError, callbackResult) {
	var processData = function(err, data) {
		if(err){
			callbackError(err);
		}else{
			callbackResult(data);			
		}
	}
	
	return fs.readFile(path.join(__dirname, filename), 'utf8', processData);
}

exports.splitWoeidssIntoArray = function(stringOfWoeids) {
	return stringOfWoeids.split("\n");
}

String.prototype.escapeSpecialCharacters = function() {
	return this.replace(/\n/g, '')
               .replace(/\r/g, '')
               .replace(/\t/g, '')
               .replace(/\b/g, '')
               .replace(/\f/g, '');
}

exports.getDataForSingleWoeid = function(woeid, callback) {
	var processResponse = function(response) {
		var data = '';
		
		var getChunk = function(responseData) {
			data += responseData;
		}
		
		var sendData = function() {
			callback(data.escapeSpecialCharacters());
		}
		
		response.on('data', getChunk);
		response.on('end', sendData);
    }
  
    http.get('http://weather.yahooapis.com/forecastrss?w=' + woeid, processResponse);
}

exports.parseDataReturnDetails = function(data) {	
	try {
		
		var xmldocument = new XmlDocument(data);
		var location = xmldocument.descendantWithPath("channel.yweather:location");
		var condition = xmldocument.descendantWithPath("channel.item.yweather:condition");

		return [location.attr.city, location.attr.region, parseInt(condition.attr.temp)];
	} catch (ex) {
		return [];
	}	
}

exports.sortResults = function(result) {
	var compare = function(data1, data2) {
		if(data1.length < 3) return 1;
		var compared = data1[0].localeCompare(data2[0]);
		if(compared === 0) return data1[1].localeCompare(data2[1]);
		return compared;
	}
	
	return result.sort(compare);
}

exports.getWeatherForCities = function(filename, errorFunction, printResultFunction) {
	var processDataFromFile = function(woeidsAsString) {
		var woeidsAsArray = exports.splitWoeidssIntoArray(woeidsAsString);

		var sortAndPrintResults = function(result) {
			var sortedResults = exports.sortResults(result);
			printResultFunction(sortedResults);
		}
	
		var result = [];
		
		var getDataAndAddToResult = function(woeid){
			
			var addToResult = function(data) {		
				result.push(exports.parseDataReturnDetails(data));
		
				if(result.length === woeidsAsArray.length){
					sortAndPrintResults(result);
				}
			}
			
			exports.getDataForSingleWoeid(woeid, addToResult)
		}
		
		woeidsAsArray.forEach(getDataAndAddToResult);
				
	}
	
	exports.readFileIntoString(filename, errorFunction, processDataFromFile);
}