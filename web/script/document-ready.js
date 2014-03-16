$(document).ready(createGame)

$(document).ready(function() {
	var socket = io.connect('http://localhost')
	
	socket.on('room', function(data) {
		console.log(data)
		if (window.location.hash == "") {
			window.location.hash = data
			$('#opponent-address').val(window.location.href)
		}
	})
})
