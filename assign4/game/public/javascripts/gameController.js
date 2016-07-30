var gameController = function($http, $document,$timeout,$location) {
	var controller = this;
	controller.users = [];
	controller.currentUser;

	var updateUsers = function(users) {
		controller.users = users.filter(controller.removeCurrentUser);
	}

	var getUsers = function() {
		$http.get('/game/users')
			.success(updateUsers);
	}

	var getCurrentUser = function() {
		$http.get('/game/currentUser')
			.success(updateCurrentUser);
	}

	var removeCurrentUser = function(user) {
		if (user.username === controller.currentUser.username)
			return false;
		return true;
	}
	
	var inviteUser = function(user) {
		$http.post('/game/inviteUser', {invitedUser:user, currentUser:controller.currentUser});
	}
	
	var updateCurrentUserFromServer = function() {
		$http.post('/game/updateCurrentUser', {user:controller.currentUser}).success(updateCurrentUser);
	}
	
	var updateCurrentUser = function(currentUser) {
		controller.currentUser = currentUser;
	}
	
	var searchForUserNameInsideArray = function(array, username){
		var user = {username : username}
		return array.some(searchForUserName, user);
	}
	
	var searchForUserName = function(user){
		return user.username === this.username;
	}
	
	var condtionToInvite = function(user) {
		if(searchForUserNameInsideArray(controller.currentUser.invitedBy, user.username)){
			return true;
		}
		return false;
	}
	
	var conditionToDisableInvitor = function(user) {
		for(var i =0; i< user.invitedBy.length; i++) {
			if(controller.currentUser.username === user.invitedBy[i].username){
				return true;
			}
		}
		return false;
	}
	
	
	var conditionToDisableIniviteAndInvitor = function(user) {
		return condtionToInvite(user) || conditionToDisableInvitor(user);
	}
	
	var declinePlayRequest = function(user){
		$http.post('/game/removeInvitedBy', {invitedBy:user, invitedUser:controller.currentUser});
	}
	
	var acceptPlayRequest = function(user){
		$http.post('/game/setWaitingFlag', {invitedBy:user, invitedUser:controller.currentUser}).success(recirectToPlayGame);																							
	}
	
	var recirectToPlayGame = function(url){
        controller.playGameUrl = url;
		location.href = url;
	}
	
	var sendUserToPlayGame = function(){
		if(controller.currentUser.playingGame){
            controller.playGameUrl = controller.currentUser.playGameUrl;
			location.href = controller.currentUser.playGameUrl;
		}	
	}
    
		
	var readyFunction = function() {
		controller.getCurrentUser();
		controller.getUsers();
        controller.poll();    
	}
	
	$document.ready(readyFunction);

      var taskToRun = function() {
        controller.getUsers();
        controller.updateCurrentUserFromServer();
        controller.sendUserToPlayGame();
        controller.poll();
      }
  
    var poll = function() {
	  $timeout(controller.taskToRun, 1000, false);
	}
	
	controller.getUsers = getUsers;
	controller.getCurrentUser = getCurrentUser;
	controller.removeCurrentUser = removeCurrentUser;
	controller.updateCurrentUserFromServer = updateCurrentUserFromServer;
	controller.inviteUser = inviteUser;
	controller.condtionToInvite = condtionToInvite;
	controller.searchForUserNameInsideArray = searchForUserNameInsideArray;
	controller.conditionToDisableIniviteAndInvitor = conditionToDisableIniviteAndInvitor;
	controller.conditionToDisableInvitor = conditionToDisableInvitor;
	controller.declinePlayRequest = declinePlayRequest;
	controller.acceptPlayRequest = acceptPlayRequest;
	controller.sendUserToPlayGame = sendUserToPlayGame;
    controller.playGameUrl;
	controller.taskToRun = taskToRun;
	controller.poll = poll;
}

angular.module('battleship', [])
	.controller('GameController', gameController);
