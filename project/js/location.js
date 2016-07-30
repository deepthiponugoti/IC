var getGeoLocation = function(navigator, elementToUpdate, trackingInfo, getMyLocationButton) {
	var locationInfo = function(position) {
    	callAnotherLocationInfo(position, trackingInfo, elementToUpdate, getMyLocationButton);
  	}
	
	var locationInfoError = function(error) {
    	callAnotherLocationInfoError(error, trackingInfo, getMyLocationButton);
  	}

    disableButtonAndDisplayMessage(getMyLocationButton, trackingInfo);
    navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
}

var disableButtonAndDisplayMessage = function(getMyLocationButton, trackingInfo){
    getMyLocationButton.disabled = true;
    trackingInfo.innerHTML = "Locating..."
}

var callAnotherLocationInfo = function(position, trackingInfo, elementToUpdate, getMyLocationButton){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	var altitude = position.coords.altitude;

    trackingInfo.innerHTML = "Your Location: " + latitude + ", " + longitude + ", " + altitude;
    elementToUpdate.value = latitude + ", " + longitude + ", " + altitude;
    getMyLocationButton.disabled = false;
}

var callAnotherLocationInfoError = function(error, trackingInfo, getMyLocationButton){
    var errorMessage = ['',
        'Permission denied',
        'Position unavailable',
        'timeout'];

    trackingInfo.innerHTML = "Cannot track your location " + errorMessage[error.code];
    getMyLocationButton.disabled = false;
}