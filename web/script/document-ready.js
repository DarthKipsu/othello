$(document).ready(function() {
	createGameboard(); //gamegrid.js
	var socket = io.connect()
	
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

			endTurnWithUserClick(socket, playerColor, validPlacements, hash)

		}, 4000)
	})

	socket.on("new turn", function(playerColor, previousTurn, newMoves, validPlacements,  hash) {
		turn = previousTurn=='black'?'white':'black'

		if (playerColor==previousTurn) {
			removeTurnFunctions()
		} else {
			showTurnFunctions(validPlacements, turn) //move.js
		}

		updatePreviousMove(playerColor, newMoves, previousTurn)
		changeTurn(playerColor) //script.js
		endTurnWithUserClick(socket, playerColor, validPlacements, hash)
	})
		
	socket.on("continue turn", function(playerColor, previousTurn, newMoves, validPlacements,  hash) {
		if (playerColor==previousTurn) {
			removeTurnFunctions()
			showTurnFunctions(validPlacements, turn) //move.js
		}

		updatePreviousMove(playerColor, newMoves, previousTurn)
		continueTurn(playerColor) //script.js
		endTurnWithUserClick(socket, playerColor, validPlacements, hash)
	})
		
	socket.on("end of game", function(playerColor, previousTurn, newMoves, hash) {
		removeTurnFunctions()
		updatePreviousMove(playerColor, newMoves, previousTurn)
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
		userLeft(userLeaving) //disconnect.js
		removeTurnFunctions()
		$('#disconnect-address').val(window.location.href)
		socket.emit('gamegridArray', gamegridArray, turn, hash)
	})

	socket.on("user reconnected", function(playerColor, userConnecting, validBlack, validWhite, savedGamegridArray, chipColors, savedTurn, hash) {
		turn = savedTurn

		$('#disconnect').hide()
		var validPlacements = turn=='black'?validBlack:validWhite

		if (playerColor==userConnecting) {
			callForChips(playerColor)
			placeChipsAfterDisco(chipColors, savedGamegridArray) //move.js

			if (turn==userConnecting) {
				showTurnFunctions(validPlacements, turn) //move.js
			}

			updateAllScores(playerColor) //score.js
			changeTurn(playerColor) //script.js
		} else {
			if (turn==playerColor) {
				showTurnFunctions(validPlacements, turn) //move.js
			}
		}

		endTurnWithUserClick(socket, playerColor, validPlacements, hash)
	})

})

function endTurnWithUserClick(socket, playerColor, validPlacements, hash) {
	$('.valid, .black-highlight, .white-highlight').click(function() {
		var thisID = getCellPosition(this) //move.js
		var thisCoordinates = validPlacements[thisID]
		socket.emit('turn end', playerColor, thisCoordinates, hash)
	})
}

function removeTurnFunctions() {
	$('.valid').unbind().empty().removeClass()
	$('.flipPath').remove()
}

function updatePreviousMove(playerColor, newMoves, previousTurn) {
	var targetCell = $('#gamegrid tr:nth-child(' + (newMoves.newChip[0]+1) +
		') td:nth-child(' + (newMoves.newChip[1]+1) + ')')
	placeAChip(targetCell, previousTurn, playerColor) //move.js
	rotateChip(playerColor, previousTurn, newMoves) //move.js
}
