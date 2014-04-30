/**
 * Updates scoreboards for both players.
 * @param {string} player - Color of the player viewing the score.
 */
function updateAllScores(player) {
	updateScore(player, 'opponent')
	updateScore(player, 'player')
}

/**
 * Change the score inside scoreboard span.
 * @param {string} player - Color of the player iewing the score.
 * @param {string} scoreboard - Scoreboard that gets updated.
 */
function updateScore(player, scoreboard) {
	var scoreSpan = document.getElementById(scoreboard + '-score')
	scoreSpan.innerHTML = scoreCalculation(player, scoreboard)
}

/**
 * Calculates how many white or black chips are on the gamegrid.
 * @param {string} player - Color of the player viewing the score.
 * @param {string} scoreboard - Scoreboard that gets updated.
 * @returns {number} The number of black or white chips on gamegrid.
 */
function scoreCalculation(player, scoreboard) {
	var chipsOnGameboard = document.querySelectorAll('.white')	
	if ((scoreboard == 'opponent' && player == 'white') ||
	    (scoreboard == 'player' && player == 'black')) {
		    chipsOnGameboard = document.querySelectorAll('.black')
	    }
	return chipsOnGameboard.length
}

/**
 * Compare scores to deduce the winner of the game.
 * @returns {array} Contains the color of the winner, winner score and opponent score.
 */
function compareScores() {
	var white = scoreCalculation('white', 'player')
	var black = scoreCalculation('black', 'player')
	if (white>black) return ['white', white, black]
	else return ['black', black, white]
}
