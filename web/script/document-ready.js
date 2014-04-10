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

	socket.on("start game", function(playerColor, validPlacements, hash) {
		console.log('start game, ', playerColor)
		$('#game-start').hide()
		callForChips(playerColor) //gamegrid.js
		first4Chips(playerColor) //move.js
		setTimeout(function() {
			beginTurns(playerColor) //script.js
			console.log(validPlacements)
			if (playerColor=='black') showTurnFunctions(validPlacements, 'black') //move.js

			$('.valid, .black-highlight').click(function() {
				var thisID = getCellPosition(this) //move.js
				var thisCoordinates = validPlacements[thisID]
				socket.emit('turn end', playerColor, thisCoordinates, hash)
				console.log('turn end', playerColor, thisCoordinates)
			})
		}, 4000)
	})

	socket.on("new turn", function(playerColor, previousTurn, newMoves, validPlacements,  hash) {
		turn = previousTurn=='black'?'white':'black'

		if (playerColor==previousTurn) {
			$('.valid').unbind().empty().removeClass()
			$('.flipPath').remove()
			
		} else {
			showTurnFunctions(validPlacements, turn)
		}

		var targetCell = $('#gamegrid tr:nth-child(' + (newMoves.newChip[0] + 1) +
			') td:nth-child(' + (newMoves.newChip[1]+1) + ')')
		placeAChip(targetCell, previousTurn, playerColor)
		rotateChip(playerColor, previousTurn, newMoves)
		changeTurn(playerColor)

		$('.valid, .black-highlight, .white-highlight').click(function() {
			var thisID = getCellPosition(this) //move.js
			var thisCoordinates = validPlacements[thisID]
			socket.emit('turn end', playerColor, thisCoordinates, hash)
			console.log('turn end', playerColor, thisCoordinates)
		})

		console.log('new turn', playerColor, newMoves, hash, turn)
		console.log(gamegridArray)
	})
})
