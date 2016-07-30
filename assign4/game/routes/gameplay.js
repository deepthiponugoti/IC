var express = require('express');
var router = express.Router();

var gamePlays = {};

router.post('/senddetails', function(req, res, next) {
	var details = req.body.details;
	var user = details.user;
	var playingWith = details.playingWith;
	var keyToStore = user.username + '_' + playingWith.username;
	var keyToSend = playingWith.username + '_' + user.username;
	
	if(typeof gamePlays[keyToStore] === 'undefined' && typeof gamePlays[keyToSend] === 'undefined'){
		gamePlays[keyToStore] = details;
		gamePlays[keyToStore].turn = true;
	}else if(typeof gamePlays[keyToStore] != 'undefined' && typeof gamePlays[keyToSend] === 'undefined'){
		gamePlays[keyToStore].turn = true;
	}else if(typeof gamePlays[keyToStore] === 'undefined' && typeof gamePlays[keyToSend] != 'undefined'){
		gamePlays[keyToStore] = details;
		gamePlays[keyToSend].turn = true;
	}else{
		gamePlays[keyToStore].turn = true;
		gamePlays[keyToSend].turn = false;
	}
	
	res.send(gamePlays[keyToSend]);
});

router.post('/changeTurn', function(req, res, next) {
	var details = req.body.details;
	var user = details.user;
	var playingWith = details.playingWith;
	var keyToStore = user.username + '_' + playingWith.username;
	var keyToSend = playingWith.username + '_' + user.username;
	
	gamePlays[keyToStore].turn = false;
	gamePlays[keyToSend].results = details.results;
	gamePlays[keyToSend].turn = true;
	res.send(gamePlays[keyToSend]);
});

router.post('/getTurn', function(req, res, next) {
	var details = req.body.details;
	var user = details.user;
	var playingWith = details.playingWith;
	var keyToStore = user.username + '_' + playingWith.username;
	var keyToSend = playingWith.username + '_' + user.username;
	
	if(details.gameOver){
		gamePlays[keyToStore].gameOver = true;
		gamePlays[keyToSend].gameOver = true;
	}
	
	res.send(gamePlays[keyToStore]);
});

module.exports = router;