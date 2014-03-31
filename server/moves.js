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

	var potentialPlacements = this.findPotentialPlacements(opponent)
	
	var validPlacements = []
	for (var i=0; i<potentialPlacements.length; i++) {
		var valid = this.findPlayerStraights(potentialPlacements[i][0], potentialPlacements[i][1], player)
		if (valid) validPlacements.push(valid)
	}

	console.log(this.gamegrid)
	console.log(opponent)
	console.log(potentialPlacements)
	console.log(validPlacements)

	return validPlacements
}

Gamegrid.prototype.emptyCellsAdjacentToOpponent = function(row, col) {
	var potentialPlacements = []
	if (this.gamegrid[row - 1][col]==undefined) potentialPlacements.push([(row - 1), col])
	if (this.gamegrid[row + 1][col]==undefined) potentialPlacements.push([(row +  1), col])
        if (this.gamegrid[row][col - 1]==undefined) potentialPlacements.push([row, (col - 1)])
	if (this.gamegrid[row][col + 1]==undefined) potentialPlacements.push([row, (col + 1)])
	return potentialPlacements
}

Gamegrid.prototype.findPotentialPlacements = function(opponent) {
	var potentialPlacements = []
	for (var row=0; row<8; row++) {
		for (var col=0; col<8; col++) {
			var cell = this.gamegrid[row][col]

			if (cell==opponent) {
				var emptyCells = this.emptyCellsAdjacentToOpponent(row, col)
				for (var i=0; i<emptyCells.length; i++) {
					potentialPlacements.push(emptyCells[i])
				}
			}
		}
	}
	return potentialPlacements
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
