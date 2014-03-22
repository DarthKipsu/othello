function updateAllScores(player) {
	updateScore(player, 'opponent')
	updateScore(player, 'player')
}

function updateScore(player, scoreboard) {
	var scoreSpan = document.getElementById(scoreboard + '-score')

	var chipsOnGameboard = document.querySelectorAll('.white')	
	if ((scoreboard == 'opponent' && player == 'white') ||
	    (scoreboard == 'player' && player == 'black')) {
		    chipsOnGameboard = document.querySelectorAll('.black')
	    }

	scoreSpan.innerHTML = chipsOnGameboard.length
}
