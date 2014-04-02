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

	changeLastChildAttributes(lastChild, movementRandomName, chipColor)

	if (chipColor == 'white') moveWhiteChipToGameboard(createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
	else moveBlackChipToGameboard(createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
	
	updateAllScores(player) //score.js
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
function changeLastChildAttributes(lastChild, movementRandomName, player) {
	$(lastChild).css('animation', movementRandomName + ' 2s 1 forwards')
	$(lastChild).css('z-index', '0')
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
 * Add CSS to move the black chip.
 * @param {stylesheet} moveCss - Stylesheet created temporarily for the animation.
 * @param {number} topMovement - Vertical movement for the chip.
 * @param {number} leftMovement - Horizonal movement for the chip.
 * @param {number} movementRandomName - A random number to identify the CSS aniamtion from.
 */
function moveBlackChipToGameboard(moveCss, topMovement, leftMovement, movementRandomName) {
	try {
		moveCss.insertRule("@-webkit-keyframes " + movementRandomName + " { from { -webkit-transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {-webkit-transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 90% {-webkit-transform: rotateX(70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 95% {-webkit-transform: rotateX(110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} to { -webkit-transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} }",0) 
	} catch (e) {}
	try {
		moveCss.insertRule("@keyframes  " + movementRandomName + " { from { transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 90% {transform: rotateX(70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 95% {transform: rotateX(110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} to { transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} }",0)
	} catch (e) {}
}

function moveWhiteChipToGameboard(moveCss, topMovement, leftMovement, movementRandomName) {
	try {
		moveCss.insertRule("@-webkit-keyframes  " + movementRandomName + " { from { -webkit-transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {-webkit-transform: rotateX(-90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 90% {-webkit-transform: rotateX(-70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 95% {-webkit-transform: rotateX(-110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} to { -webkit-transform: rotateX(-90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		(topMovement-3) + "px; left: " +
		leftMovement+ "px;} }",0) 
	} catch (e) {}
	try {
		moveCss.insertRule("@keyframes  " + movementRandomName + " { from { transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {transform: rotateX(-89deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 90% {transform: rotateX(-70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 95% {transform: rotateX(-110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} to { transform: rotateX(-89deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		(topMovement-3) + "px; left: " +
		leftMovement+ "px;} }",0)
		$('.white .bottom').css('background', 'linear-gradient(to bottom, #D9D9D9 0%, #FFF 100%) repeat scroll 0% 0% #FFF')
	} catch (e) {}
}

/**
 * Add valid class to gamegrid td's where player can move their chip into.
 * @param {array} validPlacements - Array containning identification to valid movement cells.
 */
function highlightValidMoves(validPlacements) {
	for (var i=0; i<validPlacements.length; i++) {
		var row = validPlacements[i][0] + 1
		var col = validPlacements[i][1] + 1
		$('#gamegrid tr:nth-child('+ row +') td:nth-child('+ col +')').addClass('valid v'+i)
	}
	$('.valid').mouseenter(function() {
		$(this).append('<div class="black-highlight"></div>')
		var thisValidClass = this.classList[1]
		var thisID = parseInt(thisValidClass.substring(1,2))
		var flipPath = document.createElement('div')
		flipPath.classList.add('flipPath')
		var flipPathBeginning = $('#gamegrid tr:nth-child('+(validPlacements[thisID][0]+1) +
			') td:nth-child('+ (validPlacements[thisID][1]+1) +')')
		var flipPathEnd = $('#gamegrid tr:nth-child('+ (validPlacements[thisID][2][0]+1) +
			') td:nth-child('+ (validPlacements[thisID][2][1]+1) +')')
		var movement = getCoordinates(flipPathBeginning, flipPathEnd)
		if ((movement.top < 0) || (movement.left < 0)) {
			movement = getCoordinates(flipPathEnd, flipPathBeginning)
		}
		flipPath.style.left = (movement.startLeft+40) + 'px'
		flipPath.style.top = (movement.startTop+40) + 'px'
		if (movement.top < movement.left) {
			flipPath.style.width = Math.abs(movement.left-15) + 'px'
		} else flipPath.style.width = '1px'
		if (movement.top > movement.left) {
			flipPath.style.height = Math.abs(movement.top-25) + 'px'
		} else flipPath.style.height = '1px'
		document.body.appendChild(flipPath)
		console.log(movement)
	})
	$('.valid').mouseleave(function() {
		$(this).empty()
		$('.flipPath').remove()
	})
}

/*function drawFlipPaths(start, end) {
	var canvas = document.getElementById('canvas')
	if (canvas.getContext) {
		var ctx = canvas.getContext('ad')

		ctx.strokeStyle = 'red'
		ctx.moveTo(start.left, start.top)
		ctx.lineTo(end.left, end.top)
		ctx.stroke();
	}
}*/
