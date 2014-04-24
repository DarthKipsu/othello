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

/**
 * Make changes according to players move.
 * @function makeMove
 * @param {string} player - player whose move it is.
 * @param {Object} coord - Informaton about the player move.
 * @return {Object} bject containing changes to the gamegrid due to the players move.
 */
Gamegrid.prototype.makeMove = function(player, coordinates) {
	var newMoves = this.addNewChip(player, coordinates)
	return newMoves
}

/**
 * Change the color of the rotated chips and add new chips to gamegrid.
 * @function addNewChip
 * @param {string} player - color of the player whose turn it is.
 * @param {Object} coord - Object containing the player move (one index from valid movements array)
 * @returns {function} changeChipColor, that returns object containing new move and rotations.
 */
Gamegrid.prototype.addNewChip = function(player, coord) {
	var newChip = []
	var rotatedChips = []
	var checkValidity = this.findPlayerStraights(coord.emptyRow, coord.emptyCol, player)
	if (checkValidity) {
		for (var i=0; i<checkValidity.playerRow.length; i++) {
			affectedCellCount = coord.emptyRow-checkValidity.playerRow[i]
			if (affectedCellCount==0) affectedCellCount = coord.emptyCol-checkValidity.playerCol[i]
			var newMoves = this.changeChipColor(Math.abs(affectedCellCount)+1, player, checkValidity, i)
			if (newChip.length==0) newChip.push(newMoves.newChip)
			rotatedChips.push(newMoves.rotatedChips[0])
		}
	}
	console.log('newMoves', {newChip:newChip[0], rotatedChips:rotatedChips})
	return {newChip:newChip[0], rotatedChips:rotatedChips}
}

/**
 * Find out which coodinates have chips to be added or ortated.
 * @function changeChipColor
 * @param {number} affectedCellCount - How many chips will be rotated.
 * @param {string} player - color of the player whose turn it is.
 * @param {Object} coord - Object containing information which move the player made.
 * @returns {object} Object containing newChip: new chip added, rotatedChips: rotated chips.
 */
Gamegrid.prototype.changeChipColor = function(affectedCellCount, player, coord, index) {
	var newChip = []
	var rotatedChips = []
	for (var i=0; i<affectedCellCount; i++) {
		var row = coord.emptyRow + coord.rowDirection[index]*i
		var col = coord.emptyCol + coord.colDirection[index]*i
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
 * @function validPlacements
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
 * @function findPotentialPlacements
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
 * @function emptyCellsAdjacentToOpponent
 * @param {number} row - The row with the opponent chip.
 * @param {number} col - The column with the opponent chip.
 * @returns {array} Array with empty cells that have opponent chips next to them.
 */
Gamegrid.prototype.emptyCellsAdjacentToOpponent = function(row, col) {
	var potentialPlacements = []
	if ((row>0 && col>0) && (this.gamegrid[row - 1][col - 1]==undefined)) potentialPlacements.push([(row-1), (col-1)])
	if ((row>0 && col<7) && (this.gamegrid[row - 1][col + 1]==undefined)) potentialPlacements.push([(row-1), (col+1)])
	if ((row>0) && (this.gamegrid[row - 1][col]==undefined)) potentialPlacements.push([(row - 1), col])
        if ((row<7 && col>0) && (this.gamegrid[row + 1][col - 1]==undefined)) potentialPlacements.push([(row+1), (col-1)])
	if ((row<7 && col<7) && (this.gamegrid[row + 1][col + 1]==undefined)) potentialPlacements.push([(row+1), (col+1)])
	if ((row<7) && (this.gamegrid[row + 1][col]==undefined)) potentialPlacements.push([(row +  1), col])
        if ((col>0) && (this.gamegrid[row][col - 1]==undefined)) potentialPlacements.push([row, (col - 1)])
	if ((col<7) && (this.gamegrid[row][col + 1]==undefined)) potentialPlacements.push([row, (col + 1)])
	return potentialPlacements
}

/** 
 * Find opponent chips that have a player chip behind them.
 * @function findPlayerStraights
 * @param {number} row - The row with empty cell.
 * @param {number} col - The column with empty cell.
 * @param {string} player - Color of the player whose turn it is.
 * @returns {Object} Object with coordinates to the possible placements and produced straights.
 */
Gamegrid.prototype.findPlayerStraights = function(row, col, player) {
	var direction = [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,1],[-1,-1]]
	var straight = {
		emptyRow: row,
		emptyCol: col,
		playerRow: [],
		playerCol: [],
		rowDirection: [],
		colDirection: []
	}
	
	for (var i=0; i<direction.length; i++) {
		for (var j=1; j<8; j++) {
			var rowOffset = row + direction[i][0]*j
			    colOffset = col + direction[i][1]*j
			if (rowOffset<0 || rowOffset>7 || colOffset<0 || colOffset>7) break
			else if (this.gamegrid[rowOffset][colOffset]==undefined) break
			else if (this.gamegrid[row + direction[i][0]][col + direction[i][1]]==player) break
			else if (this.gamegrid[rowOffset][colOffset]==player) {
				straight.playerRow.push(rowOffset)
				straight.playerCol.push(colOffset)
				straight.rowDirection.push(direction[i][0])
				straight.colDirection.push(direction[i][1])
				break
			}
		}
	}

	if (straight.playerRow.length!=0) return straight
	else return
}

exports.Gamegrid = Gamegrid
