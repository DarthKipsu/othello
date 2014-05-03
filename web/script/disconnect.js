function userLeft(userLeaving) {
	if ($('#disconnect').length == 0) {
		document.body.appendChild(popupDisconnect())
	} else {
		$('#disconnect').show()
	}
}

/**
 * Creates the popup div and it's contents.
 * @returns {string} Div element with game starting information.
 */
function popupDisconnect() {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'disconnect'

	createDiscoHeader2(popupDiv)
	createDiscoInstructions(popupDiv)
	createDiscoHashInput(popupDiv)
	createWaitingAnimation(popupDiv)
	
	return popupDiv
}

/**
 * Creates the welcome text.
 * @param {string} popupDiv - The div elementwhere the tect is appended into.
 */
function createDiscoHeader2(popupDiv) {
	var h2 = document.createElement('h2')
	$(h2).text("Your opponent has disconnected!")
	popupDiv.appendChild(h2)
}	

/**
 * Creates the instructions for starting a game.
 * @param {string} popupDiv - The div element where the tect is appended into.
 */
function createDiscoInstructions(popupDiv) {
	var p = document.createElement('p')
	$(p).text("The game will continue once your opponent has reconnected. To rejoin the game, he/she must enter the game with the address below.")
	popupDiv.appendChild(p)
}	

/**
 * Creates the input where the game hash identificator goes.
 * @param {string} popupDiv - The div element where the tect is appended into.
 */
function createDiscoHashInput(popupDiv) {
	var input = document.createElement('input')
	$(input).attr("type", "text")
	$(input).attr("onclick", "select()")
	input.id = "disconnect-address"
	popupDiv.appendChild(input)
}

/**
 * Create animation to show while waiting for the opponent.
 * @param {string} popupDiv - The div element where the tect is appended into.
 * @todo Implement this function.
 */
function createWaitingAnimation(popupDiv) {
	var waiting = document.createElement('p')
	waiting.id = "waiting"
	$(waiting).text("waiting for the oppponent")
	popupDiv.appendChild(waiting)
}
