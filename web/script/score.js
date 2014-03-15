function updateAllScores() {
	updateScore('white', 'opponent')
	updateScore('black', 'player')
}

function updateScore(player, status) {
	var scoreSpan = document.getElementById(status + '-score')
	var chipsOnGameboard = document.querySelectorAll('.' + player)	
	
	scoreSpan.innerHTML = chipsOnGameboard.length
}
