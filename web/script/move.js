/**
 * Adds the 4 starting chips on the gamegrid.
 * @param {string} player - The color of the player seeing this.
 */
function first4Chips(player) {

	var firstChipPosition = $('#gamegrid tr:nth-child(4) td:nth-child(4)')
	var secondChipPosition = $('#gamegrid tr:nth-child(4) td:nth-child(5)')
	var thirdChipPosition = $('#gamegrid tr:nth-child(5) td:nth-child(5)')
	var fourthChipPosition = $('#gamegrid tr:nth-child(5) td:nth-child(4)')

	placeAChip(firstChipPosition, 'black', player)
	setTimeout(function() {placeAChip(secondChipPosition, 'white', player)}, 1000)
	setTimeout(function() {placeAChip(thirdChipPosition, 'black', player)}, 2000)
	setTimeout(function() {placeAChip(fourthChipPosition, 'white', player)}, 3000)
}

/**
 * Adds a chip to it's designated gamegrid cell.
 * @param {string} targetCell - One of the td elements on the gamegrid.
 * @param {string} chipColor - color of the chip being placed.
 * @param {string} player - The color of the player seeing this.
 */
function placeAChip(targetCell, chipColor, player) {

	/** 
	 * @function getLastChipFromSlot
	 * @function getFirstChipFromSlot
	 */
	var lastChild = getLastChipFromSlot(chipColor)
	if ((player == 'black' && chipColor == "white") || 
	   (player == 'white' && chipColor == 'black')) {
		var lastChild = getFirstChipFromSlot(chipColor)
	}
	
	var randomNumberForMovementName = new Date
	var movementRandomName = 'move' + randomNumberForMovementName.getTime()
	/** @function getCoordinates */
	var movement = getCoordinates(lastChild, targetCell)

	addAnimationToLastChild(lastChild, movementRandomName, ' 2s')
	addClassesToLastChild(lastChild, chipColor)
	pushToGamegridArray(lastChild.id, targetCell)

	moveChipToGameboard(chipColor, createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
	
	updateAllScores(player) //score.js
}

/** 
 * Rotates an opponent chip after player move.
 * @param {string} player - The color of the player seeing this.
 * @param {string} chipColor - Color of the chip being placed.
 * @param {Object} newMoves - An array containing all valid moves for the player.
 */
function rotateChip(player, chipColor, newMoves) {
	var chipIds = []
	for (var i=0; i<newMoves.rotatedChips.length; i++) {
		chipIds.push(gamegridArray[newMoves.rotatedChips[i][0]][newMoves.rotatedChips[i][1]])
	}

	for (var i=0; i<chipIds.length; i++) {
		var randomNumberForMovementName = new Date
		var movementRandomName = 'rotate' + randomNumberForMovementName.getTime()

		var lastChild = $('#' + chipIds[i])
		addAnimationToLastChild(lastChild, movementRandomName, ' 1s')
		addClassesToLastChild(lastChild, chipColor)

		rotateChipCss(chipColor, chipIds[i], createTemporaryStyleForMove(), movementRandomName)

		updateAllScores(player) //score.js
	}
}

/**
 * Push information about the move to the gamegridArray.
 * @param {string} id - Id of the chip being moved.
 * @param {string} targetCell - One of the td elements in the gamegrid.
 */
function pushToGamegridArray(id, targetCell) {
	var row = targetCell.selector.substring(23,24)-1
	var col = targetCell.selector.substring(39,40)-1
	gamegridArray[row][col] = [id, row, col] //gamegrid.js
}

/**
 * Retrieve the last child of chipslot.
 * @param {string} player - Either 'white' or 'black'
 * @returns {string} The last chip on chipslot, div element.
 */
function getLastChipFromSlot(player) {
	var unusedChips = document.querySelectorAll('.' + player + '-unused')
	return unusedChips[unusedChips.length - 1]
}

/**
 * Retrieve the first child on chipslot.
 * @param {string} - Either 'white' or 'black'.
 * @returns {string} The first chip on chipslot, div element.
 */
function getFirstChipFromSlot(player) {
	var unusedChips = document.querySelector('.' + player + '-unused')
	return unusedChips
}

/**
 * Calculate movement coordinates for moving chip to the gamegrid.
 * @param {string} lastChild - The first or the last chip on chipslot, td element.
 * @param {string} targetCell - The td above which the chip will be moved.
 * @returns {object} top: vertical movement, left: horizonal movement, startTop: starting position top, startLeft: starting position left.
 */
function getCoordinates(lastChild, targetCell) {
	var chipCurrentPosition = $(lastChild).offset()
	var targetCellPosition = $(targetCell).offset()
	var topMovement = targetCellPosition.top - chipCurrentPosition.top + 33
	var leftMovement = targetCellPosition.left - chipCurrentPosition.left + 24
	return {top:topMovement, left:leftMovement,
		startTop:chipCurrentPosition.top, startLeft:chipCurrentPosition.left}
}

/**
 * Changes the chip attributes so that it moves to the gamegrid.
 * @param {string} lastChild - The first or the last chip on chipslot, div element.
 * @param {number} movementRandomName - A random number for CSS animation individual naming.
 * @param {string} time - the duration of the animation being created.
 */
function addAnimationToLastChild(lastChild, movementRandomName, time) {
	$(lastChild).css('animation', movementRandomName + time + ' 1 forwards')
	$(lastChild).css('z-index', '0')
}

/**
 * Changes the chip attributes so that it moves to the gamegrid.
 * @param {string} lastChild - The first or the last chip on chipslot, div element.
 * @param {string} player - The color of the chip being placed.
 */
function addClassesToLastChild(lastChild, player) {
	if (player == "black") $(lastChild).attr('class', 'chip black')
	else $(lastChild).attr('class', 'chip white')
}

/**
 * Add valid class to gamegrid td's where player can move their chip into and including effects.
 * @param {array} validPlacements - Array containning identification to valid movement cells.
 * @param {string} player - Color of the player whose turn it is.
 */
function showTurnFunctions(validPlacements, player) {
	highlightValidMoves(validPlacements)
	$('.valid').mouseenter(function() {
		$(this).append('<div class="' + player + '-highlight"></div>')
		showFlipPath(validPlacements, this)
	})
	$('.valid').mouseleave(function() {
		$(this).empty()
		$('.flipPath').remove()
	})
}

/**
 * Show a red line across chips that will be rotated.
 * @param {Object} validPlacements - Object containing valid placements for chips.
 * @param {string} cell - The td element the user is hovering above.
 */
function showFlipPath(validPlacements, cell) {
	/** @function flipPathMovement */
	var movement = flipPathMovement(validPlacements, cell)
	/** @function createFlipPath */
	var flipPath = createFlipPath(movement)

	for (var i=0; i<movement.length; i++) {
		if (movement[i].top == 33) {
			flipPath[i].style.width = Math.abs(movement[i].left-15) + 'px'
		} else if (movement[i].top != 33 && movement[i].left != 24) {
			var triangleSides = Math.pow(movement[i].left-15,2) + Math.pow(movement[i].top-25,2)
			flipPath[i].style.width = Math.round(Math.sqrt(triangleSides)) + 'px'
			/** @function flipPathRotation */
			flipPath[i].classList.add(flipPathRotation(movement[i]))
		} else flipPath[i].style.width = '1px'
		if (movement[i].left == 24 && movement[i].top != 33) {
			flipPath[i].style.height = Math.abs(movement[i].top-25) + 'px'
		} else flipPath[i].style.height = '1px'

		document.body.appendChild(flipPath[i])
	}
}

/**
 * Create the flip path marker div.
 * @param {Object} movement - Coordinates for the movement beginning and direction.
 * @returns {string} Div element containing the starting position of the path.
 */
function createFlipPath(movement) {
	var flipPathArray = []
	for (var i=0; i<movement.length; i++) {
		var flipPath = document.createElement('div')
		flipPath.classList.add('flipPath')

		flipPath.style.left = (movement[i].startLeft+40) + 'px'
		flipPath.style.top = (movement[i].startTop+40) + 'px'
		flipPathArray.push(flipPath)
	}
	return flipPathArray
}

/**
 * Creates an object containing needed coordinates for flip paths positioning.
 * @param {Object} validPlacements - Object containing valid placements for users new chip.
 * @param {string} cell - Td element the user is hovering on.
 * @returns {Object} Object containing start position of the path and the path direction.
 */
function flipPathMovement(validPlacements, cell) {
	/** @function flipPathCells */
	var path = flipPathCells(validPlacements, cell)
	var movement = []
	for (var i=0; i<path.end.length; i++) {
		var tempMovement = getCoordinates(path.beginning, path.end[i])

		if ((tempMovement.top < 0) || (tempMovement.left < 0)) {
			tempMovement = getCoordinates(path.end[i], path.beginning)
		}
		movement.push(tempMovement)
	}

	return movement
}

/**
 * Gives the starting and ending cells for the path to flipPathMovement function.
 * @param {Object} validPlacements - Object containing the information of the ending cell position.
 * @param {string} cell - Td element the user is hovering on.
 * @returns {Object} Object containing the path beginning and ending td elements.
 */
function flipPathCells(validPlacements, cell) {
	var thisID = getCellPosition(cell)
	var flipPathBeginning = $('#gamegrid tr:nth-child('+
		(validPlacements[thisID].emptyRow+1) + ') td:nth-child('+
		(validPlacements[thisID].emptyCol+1) +')')
	var flipPathEnd = []
	for (var i=0; i<validPlacements[thisID].playerRow.length; i++) {
		flipPathEnd.push($('#gamegrid tr:nth-child('+
				(validPlacements[thisID].playerRow[i]+1) +') td:nth-child('+
				(validPlacements[thisID].playerCol[i]+1) +')'))
	}
	return {beginning:flipPathBeginning, end:flipPathEnd}
}

/**
 * Assigns the needed rotation for diagonal flip path presentation.
 * @param {Object} movement - Coordinates for the path beginning and ending position.
 * @returns {string} Css class name for the appropriate rotation angle.
 */
function flipPathRotation(movement) {
	if (movement.top < 0 && movement.left > 0) return 'flipPath-min45'
	if (movement.top < 0 && movement.left < 0) return 'flipPath-plus45'
	if (movement.top > 0 && movement.left > 0) return 'flipPath-plus45'
	if (movement.top > 0 && movement.left < 0) return 'flipPath-plus135'
}

/**
 * Find the class name identifying which valid position cell is selected.
 * @param {string} cell - td element the user is hovering on or has selected.
 * @returns {number} The id for the selected td.
 */
function getCellPosition(cell) {
		var thisValidClass = cell.classList[1]
		if (thisValidClass.length==2) return parseInt(thisValidClass.substring(1,2))
		else return parseInt(thisValidClass.substring(1,3))
}

/**
 * Highlight movements that are legal to the player.
 * @param {array} validPlacements - Array containing the cells to be highlighted.
 */
function highlightValidMoves(validPlacements) {
	for (var i=0; i<validPlacements.length; i++) {
		var row = validPlacements[i].emptyRow + 1
		var col = validPlacements[i].emptyCol + 1
		$('#gamegrid tr:nth-child('+ row +') td:nth-child('+ col +')').addClass('valid v'+i)
	}
}

/**
 * Create new stylesheet to add the CSS animation into.
 * @returns {stylesheet} Style sheet.
 */
function createTemporaryStyleForMove() {
	var style = document.createElement('style')
	style.appendChild(document.createTextNode(''))
	document.head.appendChild(style)
	return style.sheet
}

/**
 * Assign a proper function needed to move the chip.
 * @param {string} chipColor - Color of the chip being moved.
 * @param {stylesheet} moveCss - Stylesheet created temporarily for the animation.
 * @param {number} topMovement - Vertical movement for the chip.
 * @param {number} leftMovement - Horizonal movement for the chip.
 * @param {number} movementRandomName - A random number to identify the CSS aniamtion from.
 */
function moveChipToGameboard(chipColor, moveCss, topMovement, leftMovement, movementRandomName) {
	if (chipColor=='black') {
		try {
			addCssForGameboardMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '-webkit-', '')
		} catch (e) {
			addCssForGameboardMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '', '')
		}
	} else {
		try {
			addCssForGameboardMovement(moveCss, topMovement-3, leftMovement,
					movementRandomName, '-webkit-', '-')
		} catch (e) {
			addCssForGameboardMovement(moveCss, topMovement-3, leftMovement,
					movementRandomName, '', '-')
			$('.white .bottom').css('background', 'linear-gradient(to bottom, #D9D9D9 0%, #FFF 100%) repeat scroll 0% 0% #FFF')
		}
	}
}

/**
 * Assign a proper function needed to rotate opponent chips.
 * @param {string} chipColor - Color of the player making the move.
 * @param {Array} chipIds - An array containing the id's of the opponent chips that are rotated.
 * @param {stylesheet} moveCss - Stylesheet created temporarily for the animation.
 * @param {number} movementRandomName - A random number to identify the CSS aniamtion from.
 */
function rotateChipCss(chipColor, chipIds, moveCss, movementRandomName) {
	var chipPosition = getCoordinates($('#'+chipIds[0]), $('#gamegrid tr:nth-child(' + (chipIds[1]+1) + ') td:nth-child(' + (chipIds[2]+1) + ')'))

	if (chipColor=='black') {
		try {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'-webkit-', '', chipPosition.top-3, chipPosition.left-10)
		} catch (e) {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'', '', chipPosition.top-3, chipPosition.left-10)
			rotateFirefoxFix(chipIds)
		}
	} else {
		try {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'-webkit-', '-', chipPosition.top-3, chipPosition.left-10)
		} catch (e) {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'', '', chipPosition.top-3, chipPosition.left-10)
			rotateFirefoxFix(chipIds)
		}
	}
}

/**
 * Change the back side color of the rotated chip for FireFox users. 
 * @param {Array} chipIds - Array containing id's of the chip being rotated.
 */
function rotateFirefoxFix(chipIds) {
	setTimeout(function() {
		$('#' + chipIds[0] + '.white .bottom').css('background', 'linear-gradient(to bottom, #D9D9D9 0%, #FFF 100%) repeat scroll 0% 0% #FFF')
		$('#' + chipIds[0] + '.black .bottom').css('background', 'linear-gradient(to bottom, #000000 0%, #363636 100%) repeat scroll 0% 0% #FFF')
	}, 500)
}

function placeChipsAfterDisco(chipColors, savedGamegridArray) {
	gamegridArray = savedGamegridArray
	for (var i=0; i<8; i++) {
		for (var j=0; j<8; j++) {
			if (gamegridArray[i][j]!=undefined) {
				var randomNumberForMovementName = new Date
				var movementRandomName = 'disco' + randomNumberForMovementName.getTime()
				var lastChild = document.querySelectorAll('#' + gamegridArray[i][j][0])
				var targetCell = $('#gamegrid tr:nth-child(' + (gamegridArray[i][j][1]+1) + ') td:nth-child(' + (gamegridArray[i][j][2]+1) + ')')
				var movement = getCoordinates(lastChild, targetCell)

				addAnimationToLastChild(lastChild, movementRandomName, ' 0.5s')
				addClassesToLastChild(lastChild, chipColors[i][j])
				moveDiscoChips(chipColors[i][j], gamegridArray[i][j][0], createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
			}
		}
	}
}

function moveDiscoChips(chipColor, chipId, moveCss, topMovement, leftMovement, movementRandomName) {
	try {
		if (chipColor=='black') {
			addCssForDiscoMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '-webkit-', '')
		} else {
			addCssForDiscoMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '-webkit-', '-')
		}
	} catch (e) {
		if (chipColor=='black') {
			addCssForDiscoMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '', '')
		} else {
			addCssForDiscoMovement(moveCss, topMovement, leftMovement,
				movementRandomName, '', '-')
		}
	}
}

function addCssForDiscoMovement(moveCss, topMovement, leftMovement, movementRandomName, cssWebkit, negative) {
	
	var cssRotate = 'transform: rotateX('
	    cssScale = 'deg) scale('
	    cssScaleZ = ') scaleZ('
	    cssTop = '); position: absolute; top: '
	    cssLeft = 'px; left: '

	moveCss.insertRule('@' + cssWebkit + 'keyframes ' +
	movementRandomName + ' { from { ' + cssWebkit +
	// 0%
	cssRotate + '8' +
	cssScale + '0.8, 0.8' +
	cssTop + '0' +
	cssLeft + '0px;} to {' + cssWebkit +
	// 100%
	cssRotate + negative + '90' +
	cssScale + '0.7' + 
	cssScaleZ + '0.7' +
	cssTop + topMovement +
	cssLeft + leftMovement + 'px;} }',0)
}

/**
 * Inserts css transform tion rules to the temporarily created movement stylesheet.
 * @param {stylesheet} moveCss - Stylesheet created temporarily for the animation.
 * @param {number} topMovement - Vertical movement for the chip.
 * @param {number} leftMovement - Horizonal movement for the chip.
 * @param {number} movementRandomName - A random number to identify the CSS aniamtion from.
 * @param {string} cssWebkit - -webkit- prefix if needed.
 * @param {string} negative - negative marker, if needed '-' or ''.
 */
function addCssForGameboardMovement(moveCss, topMovement, leftMovement, movementRandomName, cssWebkit, negative) {

	var cssRotate = 'transform: rotateX('
	    cssScale = 'deg) scale('
	    cssScaleZ = ') scaleZ('
	    cssTop = '); position: absolute; top: '
	    cssLeft = 'px; left: '

	moveCss.insertRule('@' + cssWebkit + 'keyframes ' + 
	movementRandomName + ' { from { ' + cssWebkit + 
	// 0%
	cssRotate + '8' + 
	cssScale + '0.8, 0.8' + 
	cssTop + '0' + 
	cssLeft + '0px;} 85% {' + cssWebkit + 
	// 85%
	cssRotate + negative + '90' + 
	cssScale + '0.7' +
	cssScaleZ + '0.7' + 
	cssTop + topMovement + 
	cssLeft + leftMovement + 'px;} 90% {' + cssWebkit + 
	// 90%
	cssRotate + negative + '70' + 
	cssScale + '0.7' + 
	cssScaleZ + '0.7' + 
	cssTop + topMovement + 
	cssLeft + leftMovement+ 'px;} 95% {' + cssWebkit + 
	// 95%
	cssRotate + negative + '110' + 
	cssScale + '0.7' + 
	cssScaleZ + '0.7' + 
	cssTop + topMovement + 
	cssLeft + leftMovement + 'px;} to { ' + cssWebkit + 
	// 100%
	cssRotate + negative + '90' + 
	cssScale + '0.7' + 
	cssScaleZ + '0.7' + 
	cssTop + topMovement + 
	cssLeft + leftMovement + 'px;} }',0)
}

/**
 * Inserts css transform tion rules to the temporarily created movement stylesheet.
 * @param {Array} chipIds - An array containing the id's of the opponent chips that are rotated.
 * @param {stylesheet} moveCss - Stylesheet created temporarily for the animation.
 * @param {number} movementRandomName - A random number to identify the CSS aniamtion from.
 * @param {string} cssWebkit - -webkit- prefix if needed.
 * @param {string} negative - negative marker, if needed '-' or ''.
 * @param {number} topPosition - top potion for the rotated chip to ensure it doesn't move.
 * @param {number} leftPosition - left position for the rotated chip to ensure it doesn't move.
 */
function addCssForRotationMovement(chipIds, moveCss, movementRandomName, cssWebkit, negative, topPosition, leftPosition) {

	var cssRotate = 'transform: rotateX('
	    cssScale = 'deg) scale('
	    cssScaleZ = ') scaleZ('
	    cssTop = '); position: absolute; top: '
	    cssLeft = 'px; left: '

	moveCss.insertRule('@' + cssWebkit + 'keyframes ' + 
	movementRandomName + ' { from { ' + cssWebkit + '' + 
	// 0%
	cssRotate + negative + '-90' + 
	cssScale + '0.7' +
	cssScaleZ + '0.7' + 
	cssTop + topPosition + 
	cssLeft + leftPosition + 'px;} 50% {' + cssWebkit + 
	// 50%
	cssRotate + '0' + 
	cssScale + '0.7' +
	cssScaleZ + '0.7' + 
	cssTop + topPosition + 
	cssLeft + leftPosition + 'px;} to {' + cssWebkit + 
	// 100%
	cssRotate + negative + '90' + 
	cssScale + '0.7' + 
	cssScaleZ + '0.7' + 
	cssTop + topPosition + 
	cssLeft + leftPosition + 'px;} }',0)
 }
