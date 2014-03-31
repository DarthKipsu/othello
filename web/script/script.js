/**
 * Keeps track on which players turn it is.
 * @constant {string}
 */
var turn 

/**
 * Start the firs players turn and show a turn message to players.
 * @param {string} player - The color of the player who is viewing the turn message.
 */
function beginTurns(player) {
	turn = 'black'
	if (player == 'black') $('#turn-marker').append('Your turn!')
	else $('#turn-marker').append('Black players turn, waiting...')
}
