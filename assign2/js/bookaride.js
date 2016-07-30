var getGeoLocation = function(navigator, elementToUpdate, trackingInfo, getMyLocationButton) {
	var locationInfo = function(position) {
    	callAnotherLocationInfo(position, trackingInfo, elementToUpdate, getMyLocationButton);
  	}
	
	var locationInfoError = function(error) {
    	callAnotherLocationInfoError(error, trackingInfo);
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

    trackingInfo.innerHTML = "Your Location: " + latitude + ", " + longitude;
    elementToUpdate.value = latitude + ", " + longitude;
    getMyLocationButton.disabled = false;
}

var callAnotherLocationInfoError = function(error, trackingInfo){
    var errorMessage = ['',
        'Permission denied',
        'Position unavailable',
        'timeout'];

    trackingInfo.innerHTML = "Cannot track your location " + errorMessage[error.code];
}

var setDraggableTrueForAllItems = function(dragDropTargets){
	for(var i = 0; i < dragDropTargets.length; i ++) {
		dragDropTargets[i]["draggable"] ='true';
	}
}

var drapDropAction = function(dragTarget, dropTarget) {
	var itemDragged = null;
	
	dragTarget.ondragstart = function(e) {
		itemDragged = e.target;
		e.dataTransfer.setData('text', '');
		return true;
	}

	
	dropTarget.ondragover = function(e) {
		e.preventDefault();
		return false;
	}
		
	dropTarget.ondrop = function(e) {
		e.target.appendChild(itemDragged);
		e.preventDefault();
		return false;
	}
		
	dropTarget.ondragend = function(e) {
		itemDragged = null;
		e.preventDefault();
		return false;
	}
}

var setListOfSelectedCars = function(listItems, carsSelectedTag, fromLocationTag, displaymessage) {
	var comaSeperatedItems = '';
	
	for(var i=0; i < listItems.length; i++){
		comaSeperatedItems += listItems[i].innerHTML + ', '
	}
	
	var isCarsSelectedEmpty = function(comaSeperatedItems) {
		if(comaSeperatedItems === ''){
            displaymessage.innerHTML = "Choose atleast one car type.";
			return true;
		}
	}
	
	if(isCarsSelectedEmpty(comaSeperatedItems)){
		return false;
	}
	
	var validateFromLocationFailed = function() {
		if(fromLocationTag.value === ""){
            displaymessage.innerHTML = "From location cannot be null, please click on Get my Location button.";
			return true;
		}
	}
	
	if(validateFromLocationFailed()){
		return false;
	}
	
	carsSelectedTag.value = comaSeperatedItems;
	
	return true;
}

