/** 
 * Create a new replica of the gamegrid.
 * @constructor
 */
function Gamegrid() {
	this.gamegrid = new Array(8)

	for (var i=0; i<8; i++) {
		this.gamegrid[i] = new Array(8)
	}

	this.gamegrid[3][3] = 'black'
	this.gamegrid[3][4] = 'white'
	this.gamegrid[4][3] = 'white'
	this.gamegrid[4][4] = 'black'
}

function addTurn(io, socket) {
	return function(player, coordinates) {
		console.log(player, coordinates)
	}
}

/**
 * Finds valid placements for the next turn.
 * @this {Gamegrid}
 * @param {string} player - Color of the player whose turn it is.
 * @returns {array} Gamegrid cells where te player can place a chip.
 */
Gamegrid.prototype.validPlacements = function(player) {
	var opponent = player=='black'?'white':'black'

	/** @function findPotentialPlacements */
	var potentialPlacements = this.findPotentialPlacements(opponent)
	
	var validPlacements = []
	for (var i=0; i<potentialPlacements.length; i++) {
		/** @function findPlayerStraights */
		var valid = this.findPlayerStraights(potentialPlacements[i][0], potentialPlacements[i][1], player)
		if (valid) validPlacements.push(valid)
	}

	console.log(this.gamegrid)
	console.log(opponent)
	console.log(potentialPlacements)
	console.log(validPlacements)

	return validPlacements
}

/**
 * Find empty cells next to opponent chips.
 * @this {Gamegrid}
 * @param {string} opponent - Color of the opponent chips.
 * @returns {array} Array of empty cells next to opponent chips.
 */
Gamegrid.prototype.findPotentialPlacements = function(opponent) {
	var potentialPlacements = []
	for (var row=0; row<8; row++) {
		for (var col=0; col<8; col++) {
			var cell = this.gamegrid[row][col]

			if (cell==opponent) {
				/** @function emptyCellsAdjacentToOpponent */
				var emptyCells = this.emptyCellsAdjacentToOpponent(row, col)
				for (var i=0; i<emptyCells.length; i++) {
					potentialPlacements.push(emptyCells[i])
				}
			}
		}
	}
	return potentialPlacements
}

/**
 * Find out if the opponent chip has any empty cells next to it.
 * @param {number} row - The row with the opponent chip.
 * @param {number} col - The column with the opponent chip.
 * @returns {array} Array with empty cells that have opponent chips next to them.
 */
Gamegrid.prototype.emptyCellsAdjacentToOpponent = function(row, col) {
	var potentialPlacements = []
	if (this.gamegrid[row - 1][col]==undefined) potentialPlacements.push([(row - 1), col])
	if (this.gamegrid[row + 1][col]==undefined) potentialPlacements.push([(row +  1), col])
        if (this.gamegrid[row][col - 1]==undefined) potentialPlacements.push([row, (col - 1)])
	if (this.gamegrid[row][col + 1]==undefined) potentialPlacements.push([row, (col + 1)])
	return potentialPlacements
}
/** 
 * Find opponent chips that have a player chip behind them.
 * @param {number} row - The row with empty cell.
 * @param {number} col - The column with empty cell.
 * @param {string} player - Color of the player whose turn it is.
 */
Gamegrid.prototype.findPlayerStraights = function(row, col, player) {
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row][col - i]==undefined) break
		else if (this.gamegrid[row][col - 1]==player) break
		else if (this.gamegrid[row][col - i]==player) return [row, col, [row, col-i]]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row][col + i]==undefined) break
		else if (this.gamegrid[row][col + 1]==player) break
		else if (this.gamegrid[row][col + i]==player) return [row, col, [row, col+i]]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row - i][col]==undefined) break
		else if (this.gamegrid[row - 1][col]==player) break
		else if (this.gamegrid[row - i][col]==player) return [row, col, [row-i, col]]
	}
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row + i][col]==undefined) break
		else if (this.gamegrid[row + 1][col]==player) break
		else if (this.gamegrid[row + i][col]==player) return [row, col, [row+i, col]]
	}
}

exports.Gamegrid = Gamegrid
exports.addTurn = addTurn
