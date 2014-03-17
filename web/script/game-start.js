function createGame() {
	document.body.appendChild(popupDiv())
}

function popupDiv() {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'game-start'

	createHeader2(popupDiv)
	createPopupInstructions(popupDiv)
	createHashInput(popupDiv)
	createWaitingAnimation(popupDiv)
	
	return popupDiv
}

function createHeader2(popupDiv) {
	var h2 = document.createElement('h2')
	$(h2).text("Welcome to the game of Othello!")
	popupDiv.appendChild(h2)
}	

function createPopupInstructions(popupDiv) {
	var p = document.createElement('p')
	$(p).text("Give the address below to your opponent. The game will start once your opponent has arrived.")
	popupDiv.appendChild(p)
}	

function createHashInput(popupDiv) {
	var input = document.createElement('input')
	$(input).attr("type", "text")
	$(input).attr("onclick", "select()")
	input.id = "opponent-address"
	popupDiv.appendChild(input)
}

function createWaitingAnimation(popupDiv) {
	var waiting = document.createElement('p')
	waiting.id = "waiting"
	$(waiting).text("waiting for the oppponent")
	popupDiv.appendChild(waiting)
}
