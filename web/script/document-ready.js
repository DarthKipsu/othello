$(document).ready(function() {
	var socket = io.connect('http://localhost')
	
	socket.on('room', function(data) {
		console.log('NEW ROOM: ' + data)
		if (window.location.hash == "") {
			createGame()
			window.location.hash = data
			$('#opponent-address').val(window.location.href)
		}
		var hash = window.location.hash.substring(1)
		socket.emit('joinRoom', hash, data)	
		console.log('JOINED ROOM: ' + hash)
	})

	socket.on("start game", function(playerColor) {
		console.log('start game, ', playerColor)
		$('#game-start').hide()
		callForChips(playerColor)
		first4Chips(playerColor)
		setTimeout(function() {beginTurns(playerColor)}, 4000)
	})
})
