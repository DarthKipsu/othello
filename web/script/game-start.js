function createGame() {
	document.body.appendChild(popupDiv())
}

function popupDiv() {
	var popupDiv = document.createElement('div')
	popupDiv.id = 'game-start'
	
	var h2 = document.createElement('h2')
	$(h2).text("Welcome to the game of Othello!")
	popupDiv.appendChild(h2)
	
	var p = document.createElement('p')
	$(p).text("Give the address below to your opponent. The game will start once your opponent has arrived.")
	popupDiv.appendChild(p)
	
	var input = document.createElement('input')
	$(input).attr("type", "text")
	input.id = "opponent-address"
	popupDiv.appendChild(input)
	
	var button = document.createElement('input')
	$(button).attr("type", "submit")
	$(button).attr("value", "Copy the link to your clipboard")
	button.id = "clipboard-copy"
	popupDiv.appendChild(button)

	var waiting = document.createElement('p')
	waiting.id = "waiting"
	$(waiting).text("waiting for the oppponent")
	popupDiv.appendChild(waiting)

	return popupDiv
}
