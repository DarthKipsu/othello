var gamegrid = new Array(8)

for (var i=0; i<8; i++) {
	gamegrid[i] = new Array(8)
}

gamegrid[3][3] = 'black'
gamegrid[3][4] = 'white'
gamegrid[4][3] = 'white'
gamegrid[4][4] = 'black'

function validPlacements(player) {
	var opponent = player=='black'?'white':'black'

	var opponentChips = []
	for (var row=0; row<8; row++) {
		for (var col=0; col<8; col++) {
			var cell = gamegrid[row][col]
			if (cell==opponent) {
				var emptyCells = emptyCellsAdjacentToOpponent(row, col)
				if (emptyCells!='empty') {
					opponentChips.push([row, col])
				}
			}
		}
	}

	var validTargets = []
	for (var i=0; i<opponentChips.length; i++) {
		var row = opponentChips[i][0]
		var col = opponentChips[i][1]-1
		if (gamegrid[row][col]==undefined) {
			validTargets.push([row, col])
		}
	}

	console.log(gamegrid)
	console.log(opponent)
	console.log(opponentChips)
	console.log(validTargets)
}

function emptyCellsAdjacentToOpponent(row, col) {
	var emptyCells = 'none'
	if ((gamegrid[row - 1][col]==undefined) ||
	    (gamegrid[row + 1][col]==undefined) ||
	    (gamegrid[row][col - 1]==undefined) ||
	    (gamegrid[row][col + 1]==undefined)) {
		    emptyCells = gamegrid[row][col]
	}
	return emptyCells
}


exports.validPlacements = validPlacements
