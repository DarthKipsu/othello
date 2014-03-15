function createGame() {
	document.body.appendChild(popupDiv())
}

function popupDiv() {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'game-start'
	var h2 = document.createElement('h2')
	$(h2).text("Welcome to the game of Othello!")
	popupDiv.appendChild(h2)
	return popupDiv
}
