fs = require('fs')
path = require('path')
http = require("http")
XmlDocument = require('xmldoc').XmlDocument

exports.readFileIntoString = (filename, callbackError, callbackResult) -> 
	processData = (err, data) ->
		if err
			callbackError err
		else
			callbackResult data
	fs.readFile (path.join __dirname, filename), 'utf8', processData

exports.splitWoeidssIntoArray = (stringOfWoeids) ->
	stringOfWoeids.split "\n"

String.prototype.escapeSpecialCharacters = () ->
	this.replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '')
        .replace(/\b/g, '')
        .replace(/\f/g, '')
		
exports.getDataForSingleWoeid = (woeid, callback) ->
	processResponse = (response) ->
		data = ''
		
		getChunk = (responseData) ->
			data += responseData
		
		sendData = () ->
			callback data.escapeSpecialCharacters()
		
		response.on 'data', getChunk
		response.on 'end', sendData
	
	http.get 'http://weather.yahooapis.com/forecastrss?w=' + woeid, processResponse

exports.parseDataReturnDetails = (data) ->
	try
		xmldocument = new XmlDocument data
		location = xmldocument.descendantWithPath "channel.yweather:location"
		condition = xmldocument.descendantWithPath "channel.item.yweather:condition"

		[location.attr.city, location.attr.region, parseInt(condition.attr.temp)]
	catch ex
		[]

exports.sortResults = (result) ->
	compare = (data1, data2) ->
		compared = 1
		if data1.length is 3 
			compared = data1[0].localeCompare data2[0]
			if compared is 0 
				compared = data1[1].localeCompare data2[1]
		compared
	
	result.sort compare

exports.getWeatherForCities = (filename, errorFunction, printResultFunction) ->
	processDataFromFile = (woeidsAsString) ->
		woeidsAsArray = exports.splitWoeidssIntoArray woeidsAsString

		sortAndPrintResults = (result) ->
			sortedResults = exports.sortResults result
			printResultFunction sortedResults
	
		result = []
		
		for woeid in woeidsAsArray
			do (woeid) ->
				addToResult = (data) ->
					result.push exports.parseDataReturnDetails data
					if woeidsAsArray.length is result.length
						sortAndPrintResults result
				
				exports.getDataForSingleWoeid woeid, addToResult
	
	exports.readFileIntoString filename, errorFunction, processDataFromFile