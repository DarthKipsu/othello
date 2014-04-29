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

function changeTurn(player) {
	if ((player == 'black') && (turn == 'white')) $('#turn-marker').html('White players turn, waiting...')
	else if ((player == 'white') && (turn == 'black')) $('#turn-marker').html('Black players turn, waiting...')
	else $('#turn-marker').html('Your turn!')
}

function continueTurn(player) {
	if ((player == 'black') && (turn == 'white')) $('#turn-marker').html('White player made a move. You have no moves available. White players turn again, waiting...')
	else if ((player == 'white') && (turn == 'black')) $('#turn-maker').html('Black player made a move. You have no moves available. Black players turn again, waiting...')
	else $('#turn-marker').html('No moves for the opponent, your move again!')
}
