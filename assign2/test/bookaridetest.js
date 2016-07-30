describe('drapDropActionTest', function() {
    
	it('canary is passing', function() {
      expect(true).to.be.eql(true);
    });
	
	it('set draggable true for zero items', function() {
		var initial = [];
		var expected = [];
		setDraggableTrueForAllItems(initial);
		expect(initial).to.be.eql(expected);
	});
	
	it('set draggable true for 2 item', function() {
		var initial = [{draggable: "false"}, {draggable: "false"}];
		var expected = [{draggable: "true"}, {draggable: "true"}];
		setDraggableTrueForAllItems(initial);
		expect(initial).to.be.eql(expected);
	});
	
	it('droptarget has ondragover events', function() {
		var dropTarget = {};
		var dragTraget = {};
		drapDropAction(dragTraget, dropTarget);
		expect(typeof(dropTarget.ondragover)).to.be.eql('function');
	});
	
	it('droptarget has ondrop events', function() {
		var dropTarget = {};
		var dragTraget = {};
		drapDropAction(dragTraget, dropTarget);
		expect(typeof(dropTarget.ondrop)).to.be.eql('function');
	});
	
	it('droptarget has ondragend events', function() {
		var dropTarget = {};
		var dragTraget = {};
		drapDropAction(dragTraget, dropTarget);
		expect(typeof(dropTarget.ondragend)).to.be.eql('function');
	});
	
    it('ondragover of droptaget prevents default events', function() {    
		var dropTarget = {};
		var dragTraget = {};
		drapDropAction(dragTraget, dropTarget);
		
		var preventDefaultCalled = false;
		var event = {
	        preventDefault: function() {
	          preventDefaultCalled = true;
	        }
		}
		
		dropTarget.ondragover(event);
		expect(preventDefaultCalled).to.be.eql(true);
		
		expect(preventDefaultCalled).to.be.eql(true);
    });

    it('ondragend of droptaget prevents default events', function() {
        var dropTarget = {};
        var dragTraget = {};
        drapDropAction(dragTraget, dropTarget);

        var preventDefaultCalled = false;
        var event = {
            preventDefault: function() {
                preventDefaultCalled = true;
            }
        }
		
        dropTarget.ondragend(event);
        expect(preventDefaultCalled).to.be.eql(true);
    });

    it('ondrop appendChild of dropTarget events', function() {
        var dropTarget = {};
        var dragTraget = {name:'Premium'};
		
		var toDrop = {};
		drapDropAction(dragTraget, dropTarget);
		
        var event = {
            target: { appendChild: function(){ 
				return dragTraget;
			}
			},
            preventDefault: function() {
                preventDefaultCalled = true;
            }
        };
		
        dropTarget.ondrop(event);
        expect(null).to.be.eql(null);
    });

    it('ondragstart of dragTarget events', function() {
        var itemDragged = "dragstart";
        var event = {
            target: '',
            dataTransfer: {setData: function(property, data){ itemDragged = property === 'text' ? data : null}}
        };

        var dropTargets = {};
        var dragTragets = {};
        drapDropAction(dragTragets, dropTargets);
        dragTragets.ondragstart(event);
        expect(itemDragged).to.be.eql('');
    });
});

describe('test set list of cars method', function() {
	it('should return false and get the message when empty list of car tag is passed', function() {
		var savedMsg = {innerHTML: ''};
		expect(setListOfSelectedCars([], {value:''}, {value:''}, savedMsg)).to.be.eql(false);
		expect(savedMsg.innerHTML).to.be.eql('Choose atleast one car type.');
	});
	
	it('should return false and display message when list of cars tag contains one car selected and from location is null', function() {
		var savedMsg = {innerHTML: ''};
		expect(setListOfSelectedCars([{innerHTML:'SUV'}], {value:''}, {value:''}, savedMsg)).to.be.eql(false);
		expect(savedMsg.innerHTML).to.be.eql('From location cannot be null, please click on Get my Location button.');
	});
	
	it('should return true and set hidden field when list of cars tag contains one car selected and from location is not null', function() {
		var listItems = [{innerHTML:'SUV'}];
		var carsSelectedTag = {value:''};
		var fromLocationTag = {value:'something'};
		expect(setListOfSelectedCars(listItems, carsSelectedTag, fromLocationTag, {})).to.be.eql(true);
		expect(carsSelectedTag).to.be.eql({value:'SUV, '});

	});
	
	it('should return true and set hidden field when list of cars tag contains two cars selected and from location is not null', function() {
		var listItems = [{innerHTML:'SUV'}, {innerHTML:'Compact'}];
		var carsSelectedTag = {value:''};
		var fromLocationTag = {value:'something'};
		expect(setListOfSelectedCars(listItems, carsSelectedTag, fromLocationTag, {})).to.be.eql(true);
		expect(carsSelectedTag).to.be.eql({value:'SUV, Compact, '});

	});
	
});

describe('geolocationtest', function(){

    it('disable the button', function(){
        var button = {disabled: false};
        disableButtonAndDisplayMessage(button, {});
        expect(button.disabled).to.be.eql(true);
    });

    it('display locating message', function(){
        var displayMessage = {innerHTML: ''};
        disableButtonAndDisplayMessage({}, displayMessage);
        expect(displayMessage.innerHTML).to.be.eql('Locating...');
    });

    it('permission denied error from callback error', function(){
        var error = {code: 1};
        var displayMessage = {innerHTML: ''};
        callAnotherLocationInfoError(error, displayMessage);
        expect(displayMessage.innerHTML).to.be.eql('Cannot track your location Permission denied');
    });

    it('position unavailable error from callback error', function(){
        var error = {code: 2};
        var displayMessage = {innerHTML: ''};
        callAnotherLocationInfoError(error, displayMessage);
        expect(displayMessage.innerHTML).to.be.eql('Cannot track your location Position unavailable');
    });

    it('timeout error from callback error', function(){
        var error = {code: 3};
        var displayMessage = {innerHTML: ''};
        callAnotherLocationInfoError(error, displayMessage);
        expect(displayMessage.innerHTML).to.be.eql('Cannot track your location timeout');
    });

    it('response received for position for hidden field', function(){
        var position = {coords: {latitude: 29.721188099999996, longitude: -95.3422602}};
        var elementToUpdate = {value: ''};

        callAnotherLocationInfo(position, {}, elementToUpdate, {});

        var expected = 29.721188099999996 + ", " + -95.3422602;
        expect(elementToUpdate.value).to.be.eql(expected);
    });

    it('display message response received for position', function(){
        var position = {coords: {latitude: 29.721188099999996, longitude: -95.3422602}};
        var trackingInfo = {innerHTML: ''};

        callAnotherLocationInfo(position, trackingInfo, {}, {});

        var expected = "Your Location: " + 29.721188099999996 + ", " + -95.3422602;
        expect(trackingInfo.innerHTML).to.be.eql(expected);
    });

    it('enable button when the response received', function(){
        var button = {disabled: true};
        var position = {coords: {latitude: 29.721188099999996, longitude: -95.3422602}};

        callAnotherLocationInfo(position, {}, {}, button);
        expect(button.disabled).to.be.eql(false);
    });

    it('check whether service is called', function(){
        var navigation = false;
        var navigator = {
            geolocation: {
                getCurrentPosition: function () {
                    navigation = true;
                }
            }
        }
        getGeoLocation(navigator, {}, {}, {});

        expect(navigation).to.be.eql(true);
    });

    it('check whether success function in getgeolocation is called', function(){
        var navigation = false;
        var position = {coords: {latitude: 29.721188099999996, longitude: -95.3422602}};
        var navigator = {
            geolocation: {
                getCurrentPosition: function (locationinfo, locationErrorInfo) {
                    locationinfo(position);
                }
            }
        }

        var trackingInfo = {innerHTML: ''};
        var expected = "Your Location: " + 29.721188099999996 + ", " + -95.3422602;
        getGeoLocation(navigator, {}, trackingInfo, {});

        expect(trackingInfo.innerHTML).to.be.eql(expected);

    });

    it('check whether error function in getgeolocation is called', function(){
        var navigation = false;
        var position = {coords: {latitude: 29.721188099999996, longitude: -95.3422602}};
        var navigator = {
            geolocation: {
                getCurrentPosition: function (locationinfo, locationErrorInfo) {
                    locationErrorInfo(error, displayMessage);
                }
            }
        }

        var error = {code: 3};
        var displayMessage = {innerHTML: ''};
        getGeoLocation(navigator, {}, displayMessage, {});
        expect(displayMessage.innerHTML).to.be.eql('Cannot track your location timeout');
    });

});