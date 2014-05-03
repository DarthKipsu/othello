$(document).ready(function() {
	createGameboard(); //gamegrid.js
	var socket = io.connect('http://localhost')
	
	socket.on('room', function(data) {
		if (window.location.hash == "") {
			createGame() //game-start.js
			window.location.hash = data
			$('#opponent-address').val(window.location.href)
		}
		var hash = window.location.hash.substring(1)
		socket.emit('joinRoom', hash, data) //rooms.js
	})

	socket.on("start game", function(playerColor, validPlacements, hash) {
		$('#game-start').hide()
		callForChips(playerColor) //gamegrid.js
		first4Chips(playerColor) //move.js
		setTimeout(function() {
			beginTurns(playerColor) //script.js
			if (playerColor=='black') showTurnFunctions(validPlacements, 'black') //move.js

			$('.valid, .black-highlight').click(function() {
				var thisID = getCellPosition(this) //move.js
				var thisCoordinates = validPlacements[thisID]
				socket.emit('turn end', playerColor, thisCoordinates, hash)
			})
		}, 4000)
	})

	socket.on("new turn", function(playerColor, previousTurn, newMoves, validPlacements,  hash) {
		console.log('new turn')
		turn = previousTurn=='black'?'white':'black'

		if (playerColor==previousTurn) {
			$('.valid').unbind().empty().removeClass()
			$('.flipPath').remove()
			
		} else {
			showTurnFunctions(validPlacements, turn) //move.js
		}

		var targetCell = $('#gamegrid tr:nth-child(' + (newMoves.newChip[0]+1) +
			') td:nth-child(' + (newMoves.newChip[1]+1) + ')')
		placeAChip(targetCell, previousTurn, playerColor) //move.js
		rotateChip(playerColor, previousTurn, newMoves) //move.js
		changeTurn(playerColor) //script.js

		$('.valid, .black-highlight, .white-highlight').click(function() {
			var thisID = getCellPosition(this) //move.js
			var thisCoordinates = validPlacements[thisID]
			socket.emit('turn end', playerColor, thisCoordinates, hash)
		})
	})
		
	socket.on("continue turn", function(playerColor, previousTurn, newMoves, validPlacements,  hash) {
		console.log('continue turn')

		if (playerColor==previousTurn) {
			$('.valid').unbind().empty().removeClass()
			$('.flipPath').remove()

			showTurnFunctions(validPlacements, turn) //move.js
		}

		var targetCell = $('#gamegrid tr:nth-child(' + (newMoves.newChip[0]+1) +
			') td:nth-child(' + (newMoves.newChip[1]+1) + ')')
		placeAChip(targetCell, previousTurn, playerColor) //move.js
		rotateChip(playerColor, previousTurn, newMoves) //move.js
		continueTurn(playerColor) //script.js

		$('.valid, .black-highlight, .white-highlight').click(function() {
			var thisID = getCellPosition(this) //move.js
			var thisCoordinates = validPlacements[thisID]
			socket.emit('turn end', playerColor, thisCoordinates, hash)
		})

	})
		
	socket.on("end of game", function(playerColor, previousTurn, newMoves, hash) {
		console.log('end of game')

		$('.valid').unbind().empty().removeClass()
		$('.flipPath').remove()

		var targetCell = $('#gamegrid tr:nth-child(' + (newMoves.newChip[0]+1) +
			') td:nth-child(' + (newMoves.newChip[1]+1) + ')')
		placeAChip(targetCell, previousTurn, playerColor) //move.js
		rotateChip(playerColor, previousTurn, newMoves) //move.js

		endGame(playerColor) //game-end.js
		$('#exits span:nth-child(1)').click(function() {
			window.location.hash=""
			document.location.reload(true)
		})
		$('#exits span:nth-child(2)').click(function() {
			$('#game-end').hide()
		})

	})

	socket.on("user left", function(userLeaving, hash) {
		console.log('user left', userLeaving)
		
		userLeft(userLeaving) //disconnect.js

		$('.valid').unbind().empty().removeClass()
		$('.flipPath').remove()
		$('#disconnect-address').val(window.location.href)
		socket.emit('gamegridArray', gamegridArray, turn, hash)

	})

	socket.on("user reconnected", function(playerColor, userConnecting, validBlack, validWhite, savedGamegridArray, chipColors, savedTurn, hash) {
		console.log('user reconnected', userConnecting)
		turn = savedTurn

		$('#disconnect').hide()
		var validPlacements = turn=='black'?validBlack:validWhite

		if (playerColor==userConnecting) {
			callForChips(playerColor)
			placeChipsAfterDisco(chipColors, savedGamegridArray) //move.js
			if (turn==userConnecting) {
				showTurnFunctions(validPlacements, turn) //move.js
			}
		} else {
			if (turn==playerColor) {
				showTurnFunctions(validPlacements, turn) //move.js
			}
		}

		$('.valid, .black-highlight, .white-highlight').click(function() {
			var thisID = getCellPosition(this) //move.js
			var thisCoordinates = validPlacements[thisID]
			socket.emit('turn end', playerColor, thisCoordinates, hash)
		})
	})

})
