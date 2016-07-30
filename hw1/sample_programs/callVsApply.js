var car = [2014, 'Benz', 'Black']

var printDetails = function (year, make, color){
	console.log(this + ': ' + year, make, color);
}

printDetails.call('Details of car',car[0],car[1],car[2])

printDetails.apply('Details of car', car)
