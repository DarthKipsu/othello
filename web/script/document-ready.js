$(document).ready(function() {
	createGameboard(); //gamegrid.js
	var socket = io.connect('http://localhost')
	
	socket.on('room', function(data) {
		console.log('NEW ROOM: ' + data)
		if (window.location.hash == "") {
			createGame() //game-start.js
			window.location.hash = data
			$('#opponent-address').val(window.location.href)
		}
		var hash = window.location.hash.substring(1)
		socket.emit('joinRoom', hash, data) //rooms.js
		console.log('JOINED ROOM: ' + hash)
	})

	socket.on("start game", function(playerColor, validPlacements) {
		console.log('start game, ', playerColor)
		$('#game-start').hide()
		callForChips(playerColor) //gamegrid.js
		first4Chips(playerColor) //move.js
		setTimeout(function() {
			beginTurns(playerColor) //script.js
			console.log(validPlacements)
			if (playerColor=='black') highlightValidMoves(validPlacements) //move.js
		}, 4000)
	})
})
