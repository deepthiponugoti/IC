var test = require('../src/include.js');
var weatherRetrieval = test.include;

exports.canaryTest = function(test) {
	test.ok(true);
	test.done();
}

exports.testReadFileIntoStringFor1Woeid = function(test) {
	var errorFunction = function(error) { }
	
	var checkResponse = function(data) {
		test.equal(data, '1234\n');
		test.done();
	}
	
	weatherRetrieval.readFileIntoString('../resources/sample1.txt', errorFunction, checkResponse);
}

exports.testReadFileIntoStringFor2Woeids = function(test) {
	var errorFunction = function(error) { }
	
	var checkResponse = function(data) {
		test.equal(data, '1234\n5678\n');
		test.done();
	}
	
	weatherRetrieval.readFileIntoString('../resources/sample.txt', errorFunction, checkResponse);
}

exports.testReadFileWhereFileDoesntExist = function(test) {
	var errorFunction = function(error) {
		test.done();
	}
	
	var checkResponse = function(data) { }
	
	weatherRetrieval.readFileIntoString('../resources/doenstexist.txt', errorFunction, checkResponse);
}

exports.testSplitWoeidssIntoArrayForEmptyString = function(test) {
	test.deepEqual([''], weatherRetrieval.splitWoeidssIntoArray(''));
	test.done();
}

exports.testSplitWoeidssIntoArrayFor2Woeids = function(test) {
	test.deepEqual(['1234','5678'], weatherRetrieval.splitWoeidssIntoArray('1234\n5678'));
	test.done();
}

exports.testGetDataForSingleWoeidValidWoeid = function(test) {
	var checkResponse = function(data) {
		test.ok(data.length > 0);
		test.done();
	}
	
	weatherRetrieval.getDataForSingleWoeid('2459115',checkResponse);	
}

exports.testParseDataReturnDetailsForValidData = function(test) {
    var data = "<rss><channel><yweather:location city=\"New York\" region=\"NY\" country=\"United States\"/><item><yweather:condition temp=\"79\"/></item></channel></rss>";
    var weatherDetails = weatherRetrieval.parseDataReturnDetails(data);
    test.deepEqual(weatherDetails, ['New York', 'NY', 79]);
    test.done();
}

exports.testParseDataReturnDetailsForInValidData = function(test) {
    test.deepEqual([], weatherRetrieval.parseDataReturnDetails(''));
    test.done();
}

exports.integrationTestForAValidWOEID = function(test) {
	var checkResponse = function(data) {
        var weatherDetails = weatherRetrieval.parseDataReturnDetails(data);
        test.ok('New York' === weatherDetails[0] && 'NY' === weatherDetails[1] && weatherDetails[2] < 200);
		test.done();
	}
	
	weatherRetrieval.getDataForSingleWoeid('2459115', checkResponse);	
}

exports.integrationTestForAInValidWOEID = function(test) {
	var checkResponse = function(data) {
		test.deepEqual([], weatherRetrieval.parseDataReturnDetails(data));
		test.done();
	}
	
	weatherRetrieval.getDataForSingleWoeid('', checkResponse);
}

exports.testSortResultsEmptyInput = function(test) {
	test.deepEqual([[],[]],weatherRetrieval.sortResults([[],[]]));
	test.done();
}

exports.testSortResultsDifferentCities = function(test) {
	var input = [["Houston","TX","100"], ["Austin","TX","88"]]
	var output = [["Austin","TX","88"], ["Houston","TX","100"]]
	test.deepEqual(weatherRetrieval.sortResults(input), output);
	test.done();
}

exports.testSortResultsSameCitiesDifferentStates = function(test) {
	var input = [["Houston","TX","100"], ["Houston","AX","88"]]
	var output = [["Houston","AX","88"], ["Houston","TX","100"]]
	test.deepEqual(weatherRetrieval.sortResults(input), output);
	test.done();
}

exports.testSortReusltsMoreData = function(test) {
	var input = [["Boston", "MA", 67],["Austin", "TX", 81],["Dallas", "TX", 86],["Austin", "AX", 81]]
	var output = [["Austin", "AX", 81],["Austin", "TX", 81],["Boston", "MA", 67],["Dallas", "TX", 86]];
	test.deepEqual(weatherRetrieval.sortResults(input), output);
	test.done();
}

exports.integratedTestForGetWeatherForCitiesValidFile = function(test) {
	var errorFunction = function(error) { }
	
	var processResult = function(data) {
		test.ok('Los Angeles' === data[0][0] && 'CA' === data[0][1] && data[0][2] < 200);
		test.ok('New York' === data[1][0] && 'NY' === data[1][1] && data[1][2] < 200);
		test.done();
	}
	
	weatherRetrieval.getWeatherForCities('../resources/testwoeid.txt', errorFunction, processResult);
}

exports.integratedTestForGetWeatherForCitiesInvalidFile = function(test) {
	var errorFunction = function(error) {
		test.done();
	}
	
	var processResult = function(data) { }
	
	weatherRetrieval.getWeatherForCities('', errorFunction, processResult);
}