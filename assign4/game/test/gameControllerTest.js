describe('gameControllerTest', function() {

    var controller;

    var sampleusers = [{
        username: 'Jade',
        waitingFlag: true,
        invitedBy: [{
            username: 'HTML',
            waitingFlag: true,
            invitedBy: []
        }]
    }, {
        username: 'HTML',
        waitingFlag: true,
        invitedBy: []
    }, {
        username: 'Angular',
        waitingFlag: true,
        invitedBy: []
    }];

    var expectedUsersListToShow = [{
        username: 'HTML',
        waitingFlag: true,
        invitedBy: []
    }, {
        username: 'Angular',
        waitingFlag: true,
        invitedBy: []
    }];

    var samplecurrent = {
        username: 'Jade',
        waitingFlag: true,
        invitedBy: [{
            username: 'Sam',
            waitingFlag: true,
            invitedBy: []
        }]
    };
    var url = "/playGame";

    beforeEach(module('battleship'));

    beforeEach(inject(function($controller, _$httpBackend_) {
        controller = $controller('GameController');
        $httpBackend = _$httpBackend_;
    }));

    it('canary should pass', function() {
        expect(true).to.be.eql(true);
    });

    it('test controller should have an empty users list on create', function() {
        expect(controller.users).to.be.eql([]);
    });

    it('test remove curretn user if user and current user are same', function() {
        controller.currentUser = samplecurrent;
        expect(controller.removeCurrentUser(samplecurrent)).to.be.eql(false);
    });

    it('test remove curretn user if user and current user are different', function() {
        controller.currentUser = {};
        expect(controller.removeCurrentUser(samplecurrent)).to.be.eql(true);
    });

    it('test getUsers should get users from the server', function() {
        $httpBackend.expectGET('/game/users')
            .respond(200, sampleusers);
        controller.currentUser = samplecurrent;
        controller.getUsers();

        $httpBackend.flush();

        expect(controller.users).to.be.eql(expectedUsersListToShow);
    });

    it('test getCurrentUser should get currentUser from the server', function() {
        $httpBackend.expectGET('/game/currentUser')
            .respond(200, samplecurrent);
        controller.getCurrentUser();

        $httpBackend.flush();

        expect(controller.currentUser).to.be.eql(samplecurrent);
    });

    it('test inviteUser should post data to server', function() {
        $httpBackend.expectPOST('/game/inviteUser')
            .respond(200, {});

        controller.inviteUser();

        $httpBackend.flush();

        expect(true).to.be.eql(true);
    });

    it('test updateCurrentUserFromServer should get data from the server and update curretn user', function() {
        $httpBackend.expectPOST('/game/updateCurrentUser')
            .respond(200, samplecurrent);

        controller.updateCurrentUserFromServer();

        $httpBackend.flush();

        expect(controller.currentUser).to.be.eql(samplecurrent);
    });

    it('test condtionToInvite for true case', function() {
        var sampleUser = {
            username: 'Sam',
            waitingFlag: true,
            invitedBy: []
        };
        controller.currentUser = samplecurrent;
        expect(controller.condtionToInvite(sampleUser)).to.be.eql(true);
    });

    it('test condtionToInvite for false case', function() {
        var sampleUser = {
            username: 'Jane',
            waitingFlag: true,
            invitedBy: []
        };
        controller.currentUser = samplecurrent;
        expect(controller.condtionToInvite(samplecurrent)).to.be.eql(false);
    });

    it('test searchForUserNameInsideArray retuns true if user present', function() {
        expect(controller.searchForUserNameInsideArray(sampleusers,
            'Jade')).to.be.eql(true);
    });

    it('test searchForUserNameInsideArray retuns false if user not present', function() {
        expect(controller.searchForUserNameInsideArray(sampleusers,
            'JadeOne')).to.be.eql(false);
    });

    it('test conditionToDisableInvitor should return true case', function() {
        controller.currentUser = samplecurrent;
        var sampleUser = {
            username: 'Jane',
            waitingFlag: true,
            invitedBy: [{
                username: 'Jade',
                waitingFlag: true,
                invitedBy: []
            }]
        };
        expect(controller.conditionToDisableInvitor(sampleUser)).to.be.eql(true);
    });

    it('test conditionToDisableInvitor should return false case', function() {
        controller.currentUser = samplecurrent;
        var sampleUser = {
            username: 'Jane',
            waitingFlag: true,
            invitedBy: [{
                username: 'sam',
                waitingFlag: true,
                invitedBy: []
            }]
        };
        expect(controller.conditionToDisableInvitor(sampleUser)).to.be.eql(false);
    });


    it('test conditionToDisableIniviteAndInvitor should return true if disableInivitor is ture', function() {
        controller.currentUser = samplecurrent;
        var sampleUser = {
            username: 'Sam',
            waitingFlag: true,
            invitedBy: []
        };
        expect(controller.conditionToDisableIniviteAndInvitor(sampleUser)).to.be.eql(true);
    });

    it('test conditionToDisableIniviteAndInvitor should return true if disableInvitee is ture', function() {
        controller.currentUser = samplecurrent;
        var sampleUser = {
            username: 'Jane',
            waitingFlag: true,
            invitedBy: [{
                username: 'Jade',
                waitingFlag: true,
                invitedBy: []
            }]
        };
        expect(controller.conditionToDisableIniviteAndInvitor(sampleUser)).to.be.eql(true);
    });

    it('test conditionToDisableIniviteAndInvitor should return false if disableInvitee and disableInvitor are false', function() {
        controller.currentUser = samplecurrent;
        var sampleUser = {
            username: 'Jane',
            waitingFlag: true,
            invitedBy: [{
                username: 'sam',
                waitingFlag: true,
                invitedBy: []
            }]
        };
        expect(controller.conditionToDisableIniviteAndInvitor(sampleUser)).to.be.eql(false);
    });

    it('test declinePlayRequest should post data to server', function() {
        var sampleUserOne = {
            username: 'Jade',
            waitingFlag: true,
            invitedBy: []
        };
        var sampleUserTwo = {
            username: 'HTML',
            waitingFlag: true,
            invitedBy: []
        };
        controller.users = sampleusers;
        $httpBackend.expectPOST('/game/removeInvitedBy', {
            invitedBy: sampleUserOne,
            invitedUser: sampleUserTwo
        })
            .respond(200, {});
        controller.currentUser = sampleUserTwo;
        controller.declinePlayRequest(sampleUserOne);

        $httpBackend.flush();

        expect(true).to.be.eql(true);
    });

    it('test acceptPlayRequest should post data to server', function() {
        var sampleUserOne = {
            username: 'Jade',
            waitingFlag: true,
            invitedBy: []
        };
        var sampleUserTwo = {
            username: 'HTML',
            waitingFlag: true,
            invitedBy: []
        };
        var url = "playGame?user=" + sampleUserOne.username + "&playingwith=" + sampleUserTwo.username + "";
        $httpBackend.expectPOST('/game/setWaitingFlag', {
            invitedBy: sampleUserOne,
            invitedUser: sampleUserTwo
        })
            .respond(200, url);
        controller.currentUser = sampleUserTwo;
        controller.acceptPlayRequest(sampleUserOne);
        $httpBackend.flush();

        expect(controller.playGameUrl).to.be.eql(url);
    });

    it('test sendUserToPlayGame should set controller.playGameUrl to playGame if controller.currentUser.playingGame is true', function() {
        controller.currentUser = samplecurrent;
        controller.currentUser.playGameUrl = "playGame?user=bob&playingwith=nick";
        controller.currentUser.playingGame = true;
        controller.sendUserToPlayGame();

        expect(controller.playGameUrl).to.be.eql(controller.currentUser.playGameUrl);
    });

    it('test sendUserToPlayGame if controller.currentUser.playingGame is false ', function() {
        controller.currentUser = samplecurrent;
        controller.currentUser.playingGame = false;
        controller.sendUserToPlayGame();
        expect(controller.playGameUrl).to.be.eql(undefined);
    });
});

describe('gameControllerDocumentInteractionTest', function() {
    var funkPassed;
    beforeEach(module('battleship'));


    beforeEach(inject(function($controller, $document) {
        $document.ready = function(funk) {
            funkPassed = funk;
        }

        controller = $controller('GameController');
    }));

    it('test document ready should receive function', function() {
        var getCurrentUserCalled = false;
        var getUsersCalled = false;
        var pollCalled = false;
        controller.getCurrentUser = function() {
            getCurrentUserCalled = true;
        }
        controller.getUsers = function() {
            getUsersCalled = true;
        }
        controller.poll = function() {
            pollCalled = true;
        }
        funkPassed();
        var result = getCurrentUserCalled && getUsersCalled && pollCalled;
        expect(result).to.be.eql(true);
    });
});

describe('PollTest', function() {
    var controller;
    var $timeout;

    beforeEach(module('battleship'));

    beforeEach(inject(function($controller, _$timeout_) {
        controller = $controller('GameController');
        $timeout = _$timeout_;
    }));

    it('test poll calls the given function', function() {
        var called = false;

        controller.taskToRun = function() {
            called = true;
        }

        controller.poll();
        $timeout.flush();
        expect(called).to.be.eql(true);
    });

    it('test taskToRun calls 3 other functions', function() {
        var getUsers = false;
        var updateCurrentUserFromServer = false;
        var sendUserToPlayGame = false;
        var pollCalled = false;


        controller.getUsers = function() {
            getUsers = true;
        }
        controller.updateCurrentUserFromServer = function() {
            updateCurrentUserFromServer = true;
        }
        controller.sendUserToPlayGame = function() {
            sendUserToPlayGame = true;
        }
        controller.poll = function() {
            pollCalled = true;
        }

        controller.taskToRun();
        
        var result = getUsers && updateCurrentUserFromServer && sendUserToPlayGame && pollCalled;
        expect(result).to.be.eql(true);
    });

});