function Gamegrid() {
	this.gamegrid = new Array(8)

	for (var i=0; i<8; i++) {
		this.gamegrid[i] = new Array(8)
	}

	this.gamegrid[3][3] = 'black'
	this.gamegrid[3][4] = 'white'
	this.gamegrid[4][3] = 'white'
	this.gamegrid[4][4] = 'black'
	//this.gamegrid[5][3] = 'white'
}

Gamegrid.prototype.validPlacements = function(player) {
	var opponent = player=='black'?'white':'black'

	var potentialTargets = []
	for (var row=0; row<8; row++) {
		for (var col=0; col<8; col++) {
			var cell = this.gamegrid[row][col]

			if (cell==opponent) {
				var emptyCells = this.emptyCellsAdjacentToOpponent(row, col)
				for (var i=0; i<emptyCells.length; i++) {
					potentialTargets.push(emptyCells[i])
				}
			}
		}
	}

	var validTargets = []
	for (var i=0; i<potentialTargets.length; i++) {
		var valid = this.findPlayerStraights(potentialTargets[i][0], potentialTargets[i][1], player)
		if (valid) validTargets.push(valid)
	}

	console.log(this.gamegrid)
	console.log(opponent)
	console.log(potentialTargets)
	console.log(validTargets)

	return validTargets
}

Gamegrid.prototype.emptyCellsAdjacentToOpponent = function(row, col) {
	var potentialTargets = []
	if (this.gamegrid[row - 1][col]==undefined) potentialTargets.push([(row - 1), col])
	if (this.gamegrid[row + 1][col]==undefined) potentialTargets.push([(row +  1), col])
        if (this.gamegrid[row][col - 1]==undefined) potentialTargets.push([row, (col - 1)])
	if (this.gamegrid[row][col + 1]==undefined) potentialTargets.push([row, (col + 1)])
	return potentialTargets
}

Gamegrid.prototype.findPlayerStraights = function(row, col, player) {
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row][col - i]==undefined) break
		else if (this.gamegrid[row][col - 1]==player) break
		else if (this.gamegrid[row][col - i]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row][col + i]==undefined) break
		else if (this.gamegrid[row][col + 1]==player) break
		else if (this.gamegrid[row][col + i]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row - i][col]==undefined) break
		else if (this.gamegrid[row - 1][col]==player) break
		else if (this.gamegrid[row - i][col]==player) return [row, col]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row + i][col]==undefined) break
		else if (this.gamegrid[row + 1][col]==player) break
		else if (this.gamegrid[row + i][col]==player) return [row, col]
	}
}

exports.Gamegrid = Gamegrid
