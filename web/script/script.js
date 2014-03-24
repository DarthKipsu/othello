var turn 

function beginTurns(player) {
	turn = 'black'
	if (player == 'black') $('#turn-marker').append('Your turn!')
	else $('#turn-marker').append('Black players turn, waiting...')
}
