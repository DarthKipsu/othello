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

function placeAChip(targetCell, chipColor, player) {

	var lastChild = getLastChipFromSlot(chipColor)
	if ((player == 'black' && chipColor == "white") || 
	   (player == 'white' && chipColor == 'black')) {
		var lastChild = getFirstChipFromSlot(chipColor)
	}
	
	var randomNumberForMovementName = new Date
	var movementRandomName = 'move' + randomNumberForMovementName.getTime()
	var movement = getCoordinates(lastChild, targetCell)

	changeLastChildAttributes(lastChild, movementRandomName, chipColor)

	if (chipColor == 'white') moveWhiteChipToGameboard(createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
	else moveBlackChipToGameboard(createTemporaryStyleForMove(), movement.top, movement.left, movementRandomName)
	
	updateAllScores(player)
}

function getLastChipFromSlot(player) {
	var unusedChips = document.querySelectorAll('.' + player + '-unused')
	return unusedChips[unusedChips.length - 1]
}

function getFirstChipFromSlot(player) {
	var unusedChips = document.querySelector('.' + player + '-unused')
	return unusedChips
}

function getCoordinates(lastChild, targetCell) {
	var chipCurrentPosition = $(lastChild).offset()
	var targetCellPosition = $(targetCell).offset()
	var topMovement = targetCellPosition.top - chipCurrentPosition.top + 33
	var leftMovement = targetCellPosition.left - chipCurrentPosition.left + 24
	return {top:topMovement, left:leftMovement}
}

function changeLastChildAttributes(lastChild, movementRandomName, player) {
	$(lastChild).css('animation', movementRandomName + ' 2s 1 forwards')
	$(lastChild).css('z-index', '0')
	if (player == "black") $(lastChild).attr('class', 'chip black')
	else $(lastChild).attr('class', 'chip white')
}

function createTemporaryStyleForMove() {
	var style = document.createElement('style')
	style.appendChild(document.createTextNode(''))
	document.head.appendChild(style)
	return style.sheet
}


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
