$(document).ready(function() {
	var socket = io.connect('http://localhost')
	
	socket.on('room', function(data) {
		console.log(data)
		if (window.location.hash == "") {
			createGame()
			window.location.hash = data
			$('#opponent-address').val(window.location.href)
		} else {
			var hash = window.location.hash.substring(1)
			socket.emit('joinRoom', hash)	
			console.log(hash)
		}
	})

	socket.on("start game", function() {
		console.log('start game')
		$('#game-start').hide()
		first4Chips()
	})
})
