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

Gamegrid.prototype.makeMove = function(player, coordinates) {
	var newMoves = this.addNewChip(player, coordinates)
	return newMoves
}

Gamegrid.prototype.addNewChip = function(player, coord) {
	var newMoves
	var checkValidity = this.findPlayerStraights(coord.emptyRow, coord.emptyCol, player)
	if (checkValidity) {
		var affectedCellCount = coord.emptyRow-coord.playerRow
		if (affectedCellCount == 0) {
			affectedCellCount = coord.emptyCol-coord.playerCol
		}
		newMoves = this.changeChipColor(Math.abs(affectedCellCount)+1, player, coord)
	}
	return newMoves
}

Gamegrid.prototype.changeChipColor = function(affectedCellCount, player, coord) {
	var newChip = []
	var rotatedChips = []
	for (var i=0; i<affectedCellCount; i++) {
		var row = coord.emptyRow + coord.rowOffset*i
		var col = coord.emptyCol + coord.colOffset*i
		var chipColor = this.gamegrid[row][col]
		if (chipColor==undefined) {
			newChip.push(row, col)
			this.gamegrid[row][col] = player
		} else if (chipColor!=player) {
			rotatedChips.push([row, col])
			this.gamegrid[row][col] = player
		}
	}
	return {newChip:newChip, rotatedChips:rotatedChips}
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

	var validPlacementsStrings = validPlacements.map(JSON.stringify)
	validPlacements = validPlacements.filter(function(element, index) {
		return validPlacementsStrings.indexOf(JSON.stringify(element)) == index
	})

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
	if (this.gamegrid[row - 1][col - 1]==undefined) potentialPlacements.push([(row-1), (col-1)])
	if (this.gamegrid[row - 1][col + 1]==undefined) potentialPlacements.push([(row-1), (col+1)])
        if (this.gamegrid[row + 1][col - 1]==undefined) potentialPlacements.push([(row+1), (col-1)])
	if (this.gamegrid[row + 1][col + 1]==undefined) potentialPlacements.push([(row+1), (col+1)])
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
	var straights = []
	straights.push(this.findAStraight(row, col, player, 0, 1))
	straights.push(this.findAStraight(row, col, player, 0, -1))
	straights.push(this.findAStraight(row, col, player, 1, 0))
	straights.push(this.findAStraight(row, col, player, -1, 0))
	straights.push(this.findAStraight(row, col, player, 1, 1))
	straights.push(this.findAStraight(row, col, player, 1, -1))
	straights.push(this.findAStraight(row, col, player, -1, 1))
	straights.push(this.findAStraight(row, col, player, -1, -1))
	return straights.filter(function(element){return element != undefined})[0]
}

Gamegrid.prototype.findAStraight = function(row, col, player, rowOffset, colOffset) {
	for (var i=1; i<8; i++) {
		if (this.gamegrid[row + rowOffset*i][col + colOffset*i]==undefined) break
		else if (this.gamegrid[row + rowOffset][col + colOffset]==player) break
		else if (this.gamegrid[row + rowOffset*i][col + colOffset*i]==player) return {
			emptyRow: row,
			emptyCol: col,
			playerRow: row + rowOffset*i,
			playerCol: col + colOffset*i,
			rowOffset: rowOffset,
			colOffset: colOffset
		}
	}
}

exports.Gamegrid = Gamegrid
