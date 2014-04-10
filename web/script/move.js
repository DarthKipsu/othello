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
 * @param {td element} targetCell - One of the cells on the gamegrid.
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

function pushToGamegridArray(id, targetCell) {
	var row = targetCell.selector.substring(23,24)-1
	var col = targetCell.selector.substring(39,40)-1
	gamegridArray[row][col] = [id, row, col]
}

/**
 * Retrieve the last child of chipslot.
 * @param {string} player - Either 'white' or 'black'
 * @returns {div element} The last chip on chipslot.
 */
function getLastChipFromSlot(player) {
	var unusedChips = document.querySelectorAll('.' + player + '-unused')
	return unusedChips[unusedChips.length - 1]
}

/**
 * etrieve te first child on chipslot.
 * @param {string} - Either 'white' or 'black'.
 * @returns {div element} The first chip on chipslot.
 */
function getFirstChipFromSlot(player) {
	var unusedChips = document.querySelector('.' + player + '-unused')
	return unusedChips
}

/**
 * Calculate movement coordinates for moving chip to the gamegrid.
 * @param {div element} lastChild - The first or the last chip on chipslot.
 * @param {td element} targetCell - The td above which the chip will be moved.
 * @returns {object} top: vertical movement, left: horizonal movement.
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
 * @param {div element} lastChild - The first or the last chip on chipslot.
 * @param {number} movementRandomName - A random number for CSS animation individual naming.
 * @param {string} player - The color of the chip being placed.
 */
function addAnimationToLastChild(lastChild, movementRandomName, time) {
	$(lastChild).css('animation', movementRandomName + time + ' 1 forwards')
	$(lastChild).css('z-index', '0')
}

function addClassesToLastChild(lastChild, player) {
	if (player == "black") $(lastChild).attr('class', 'chip black')
	else $(lastChild).attr('class', 'chip white')
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
 * Add valid class to gamegrid td's where player can move their chip into.
 * @param {array} validPlacements - Array containning identification to valid movement cells.
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

function showFlipPath(validPlacements, cell) {
	var movement = flipPathMovement(validPlacements, cell)

	var flipPath = document.createElement('div')
	flipPath.classList.add('flipPath')

	flipPath.style.left = (movement.startLeft+40) + 'px'
	flipPath.style.top = (movement.startTop+40) + 'px'
	if (movement.top < movement.left) {
		flipPath.style.width = Math.abs(movement.left-15) + 'px'
	} else flipPath.style.width = '1px'
	if (movement.top > movement.left) {
		flipPath.style.height = Math.abs(movement.top-25) + 'px'
	} else flipPath.style.height = '1px'

	document.body.appendChild(flipPath)
}

function flipPathCells(validPlacements, cell) {
	var thisID = getCellPosition(cell)
	var flipPathBeginning = $('#gamegrid tr:nth-child('+(validPlacements[thisID].emptyRow+1) +
		') td:nth-child('+ (validPlacements[thisID].emptyCol+1) +')')
	var flipPathEnd = $('#gamegrid tr:nth-child('+ (validPlacements[thisID].playerRow+1) +
		') td:nth-child('+ (validPlacements[thisID].playerCol+1) +')')
	return {beginning:flipPathBeginning, end:flipPathEnd}
}

function flipPathMovement(validPlacements, cell) {
	var path = flipPathCells(validPlacements, cell)
	var movement = getCoordinates(path.beginning, path.end)

	if ((movement.top < 0) || (movement.left < 0)) {
		movement = getCoordinates(path.end, path.beginning)
	}

	return movement
}

/**
 * Find the class name identifying which valid position cell is selected.
 * @param {td element} cell - td the user is hovering on or has selected.
 * @returns {number} The id for the selected td.
 */
function getCellPosition(cell) {
		var thisValidClass = cell.classList[1]
		return parseInt(thisValidClass.substring(1,2))
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
 * Add CSS to move the black chip.
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

function rotateChipCss(chipColor, chipIds, moveCss, movementRandomName) {
	var chipPosition = getCoordinates($('#'+chipIds[0]), $('#gamegrid tr:nth-child(' + (chipIds[1]+1) + ') td:nth-child(' + (chipIds[2]+1) + ')'))

	if (chipColor=='black') {
		try {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'-webkit-', '', chipPosition.top-3, chipPosition.left-10)
		} catch (e) {
			addCssForRotationMovement(chipIds, moveCss, movementRandomName,
					'', '', chipPosition.top-3, chipPosition.left-10)
			setTimeout(function() {
				$('.white .bottom').css('background', 'linear-gradient(to bottom, #D9D9D9 0%, #FFF 100%) repeat scroll 0% 0% #FFF')
				$('.black .bottom').css('background', 'linear-gradient(to bottom, #000000 0%, #363636 100%) repeat scroll 0% 0% #FFF')
			}, 500)
		}
	} else {
		console.log('white chip')
	}
}
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
