$(document).ready(createGame)

var socket = io.connect('http://localhost')

socket.on('game-id', function(data) {
	console.log(data)
})
