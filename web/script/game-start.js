/** Shows a div on top of gameboard when the first player enters the game. */
function createGame() {
	document.body.appendChild(popupDiv())
}

/**
 * Creates the popup div and it's contents.
 * @returns {div element} Div with game starting information.
 */
function popupDiv() {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'game-start'

	createHeader2(popupDiv)
	createPopupInstructions(popupDiv)
	createHashInput(popupDiv)
	createWaitingAnimation(popupDiv)
	
	return popupDiv
}

/**
 * Creates the welcome text.
 * @param {div element} popupDiv - The div where the tect is appended into.
 */
function createHeader2(popupDiv) {
	var h2 = document.createElement('h2')
	$(h2).text("Welcome to the game of Othello!")
	popupDiv.appendChild(h2)
}	

/**
 * Creates the instructions for starting a game.
 * @param {div element} popupDiv - The div where the tect is appended into.
 */
function createPopupInstructions(popupDiv) {
	var p = document.createElement('p')
	$(p).text("Give the address below to your opponent. The game will start once your opponent has arrived.")
	popupDiv.appendChild(p)
}	

/**
 * Creates the input where the game hash identificator goes.
 * @param {div element} popupDiv - The div where the tect is appended into.
 */
function createHashInput(popupDiv) {
	var input = document.createElement('input')
	$(input).attr("type", "text")
	$(input).attr("onclick", "select()")
	input.id = "opponent-address"
	popupDiv.appendChild(input)
}

/**
 * Create animation to show while waiting for the opponent.
 * @param {div element} popupDiv - The div where the tect is appended into.
 * @todo Implement this function.
 */
function createWaitingAnimation(popupDiv) {
	var waiting = document.createElement('p')
	waiting.id = "waiting"
	$(waiting).text("waiting for the oppponent")
	popupDiv.appendChild(waiting)
}
