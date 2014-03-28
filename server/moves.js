var gamegrid = new Array(8)

for (var i=0; i<8; i++) {
	gamegrid[i] = new Array(8)
}

gamegrid[3][3] = 'black'
gamegrid[3][4] = 'white'
gamegrid[4][3] = 'white'
gamegrid[4][4] = 'black'
//gamegrid[5][3] = 'white'

function validPlacements(player) {
	var opponent = player=='black'?'white':'black'

	var potentialTargets = []
	for (var row=0; row<8; row++) {
		for (var col=0; col<8; col++) {
			var cell = gamegrid[row][col]

			if (cell==opponent) {
				var emptyCells = emptyCellsAdjacentToOpponent(row, col)
				for (var i=0; i<emptyCells.length; i++) {
					potentialTargets.push(emptyCells[i])
				}
			}
		}
	}

	var validTargets = []
	for (var i=0; i<potentialTargets.length; i++) {
		var valid = findPlayerStraights(potentialTargets[i][0], potentialTargets[i][1], player)
		if (valid) validTargets.push(valid)
	}

	console.log(gamegrid)
	console.log(opponent)
	console.log(potentialTargets)
	console.log(validTargets)

	return validTargets
}

function emptyCellsAdjacentToOpponent(row, col) {
	var potentialTargets = []
	if (gamegrid[row - 1][col]==undefined) potentialTargets.push([(row - 1), col])
	if (gamegrid[row + 1][col]==undefined) potentialTargets.push([(row +  1), col])
        if (gamegrid[row][col - 1]==undefined) potentialTargets.push([row, (col - 1)])
	if (gamegrid[row][col + 1]==undefined) potentialTargets.push([row, (col + 1)])
	return potentialTargets
}

function findPlayerStraights(row, col, player) {
	for (var i=1; i<8; i++) {
		if (gamegrid[row][col - i]==undefined) break
		else if (gamegrid[row][col - 1]==player) break
		else if (gamegrid[row][col - i]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (gamegrid[row][col + i]==undefined) break
		else if (gamegrid[row][col + 1]==player) break
		else if (gamegrid[row][col + i]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (gamegrid[row - i][col]==undefined) break
		else if (gamegrid[row - 1][col]==player) break
		else if (gamegrid[row - i][col]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (gamegrid[row + i][col]==undefined) break
		else if (gamegrid[row + 1][col]==player) break
		else if (gamegrid[row + i][col]==player) return [row, col]
	}
}

exports.validPlacements = validPlacements
