/** Shows a div on top of gameboard when the game ends. */
function endGame(player) {
	var winner = compareScores()
	document.body.appendChild(endDiv(player, winner))
}

/**
 * Creates the popup div and it's contents.
 * @param {string} player - player viewing the item.
 * @param {array} winner - array containing winner color, winner score and opponent score.
 * @returns {string} Div element with game starting information.
 */
function endDiv(player, winner) {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'game-end'

	createEndHeader2(popupDiv, player, winner)
	createEndScore(popupDiv, player, winner)
	createExits(popupDiv)
	
	return popupDiv
}

/**
 * Creates the winner announcement.
 * @param {string} popupDiv - The div elementwhere the tect is appended into.
 * @param {string} player - player viewing the item.
 * @param {array} winner - array containing winner color, winner score and opponent score.
 */
function createEndHeader2(popupDiv, player, winner) {
	var h2 = document.createElement('h2')
	if (player==winner[0]) {
		$(h2).text("Congrats! You have won the game!")
	} else if (winner[0]=='white') {
		$(h2).text("White player has won the game!")
	} else {
		$(h2).text("Black player has won the game!")
	}
	popupDiv.appendChild(h2)
}	

/**
 * Creates the score display.
 * @param {string} popupDiv - The div element where the tect is appended into.
 * @param {string} player - player viewing the item.
 * @param {array} winner - array containing winner color, winner score and opponent score.
 */
function createEndScore(popupDiv, player, winner) {
	var p = document.createElement('p')
	if (player==winner[0]) {
		$(p).text("Your score was " + winner[1] + "! The opponen scored " + winner[2] +
			" points. Well done!")
	} else {
		$(p).text("Your score was " + winner[2] + "! The opponen scored " + winner[1] +
			" points. Better luck next time!")
	}
		popupDiv.appendChild(p)
}	

/**
 * Creates the input where the game hash identificator goes.
 * @param {string} popupDiv - The div element where the tect is appended into.
 */
function createExits(popupDiv) {
	var p = document.createElement('p')
	p.id = 'exits'
	var again = document.createElement('span')
	$(again).text("Start a new game! ")
	var exit = document.createElement('span')
	$(exit).text(" Close this window")

	p.appendChild(again)
	p.appendChild(exit)
	popupDiv.appendChild(p)
}
