function updateAllScores(player) {
	updateScore(player, 'opponent')
	updateScore(player, 'player')
}

function updateScore(player, scoreboard) {
	var scoreSpan = document.getElementById(scoreboard + '-score')
	scoreSpan.innerHTML = scoreCalculation(player, scoreboard)
}

function scoreCalculation(player, scoreboard) {
	var chipsOnGameboard = document.querySelectorAll('.white')	
	if ((scoreboard == 'opponent' && player == 'white') ||
	    (scoreboard == 'player' && player == 'black')) {
		    chipsOnGameboard = document.querySelectorAll('.black')
	    }
	return chipsOnGameboard.length
}
