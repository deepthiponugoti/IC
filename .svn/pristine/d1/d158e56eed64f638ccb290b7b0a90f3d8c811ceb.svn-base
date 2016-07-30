var sucessMessage = "Saved data on the server.";
var failureMessage = "Saved data locally due to network unavailabilty or server failure.";

var storeLocally = function(data, localStorage) {
	var workOrderCount = parseInt(localStorage.workOrderCount) + 1 || 0;
	localStorage['workOrder' + workOrderCount] = data;
	localStorage.workOrderCount = workOrderCount;
}

var getCurrentDate = function() {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	return now.getFullYear()+"-"+(month)+"-"+(day);
}

var setCurrentDate = function(dateTag) {
	dateTag.value = getCurrentDate();
}

var submitFromData = function(data) {
	$.ajax({
		url: '/workorder',
	   	data: data,
	    dataType:'json',
	    type:'POST',
		asyn:false
	});
}

var invokeIfConnected = function(successCallBack, messageSpan, localStorage) {
	$.get("/?q=" + Math.random(), function(data){
		successCallBack(messageSpan, localStorage);
	}).fail(function() {
		messageSpan.innerHTML = failureMessage;
	});
}

var sendToServer = function(messageSpan, localStorage) {
	for(var i=0; i <= localStorage.workOrderCount ; i++){
		var data = localStorage['workOrder' + i];
		submitFromData(data);
	}
	messageSpan.innerHTML = sucessMessage;
	localStorage.clear();
}

var submitData = function(messageSpan, trackingSpan, localStorage, workOrder) {
	storeLocally(workOrder, localStorage);
	invokeIfConnected(sendToServer, messageSpan, localStorage);
}