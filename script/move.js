$(document).ready(function() {

	var firstChipPosition = $('#gamegrid tr:nth-child(4) td:nth-child(4)')
	var secondChipPosition = $('#gamegrid tr:nth-child(4) td:nth-child(5)')
	var thirdChipPosition = $('#gamegrid tr:nth-child(5) td:nth-child(4)')
	var fourthChipPosition = $('#gamegrid tr:nth-child(5) td:nth-child(5)')

	placeAChip(firstChipPosition, 'black')
})

function placeAChip(targetCell, player) {

	var lastChild = getLastChipFromSlot(player)
	var movement = getCoordinates(lastChild, targetCell)

	changeLastChildAttributes(lastChild)

	moveChipToGameboard(createTemporaryStyleForMove(), movement.top, movement.left)
}

function getLastChipFromSlot(player) {
	var unusedChips = document.querySelectorAll('.' + player + '-unused')
	return unusedChips[unusedChips.length - 1]
}

function getCoordinates(lastChild, targetCell) {
	var chipCurrentPosition = $(lastChild).offset()
	var targetCellPosition = $(targetCell).offset()
	var topMovement = targetCellPosition.top - chipCurrentPosition.top + 33
	var leftMovement = targetCellPosition.left - chipCurrentPosition.left + 24
	return {top:topMovement, left:leftMovement}
}

function changeLastChildAttributes(lastChild) {
	$(lastChild).css('animation', 'movechip 2s 1 forwards')
	$(lastChild).attr('class', 'chip black')
}

function createTemporaryStyleForMove() {
	var style = document.createElement('style')
	style.appendChild(document.createTextNode(''))
	document.head.appendChild(style)
	return style.sheet
}


function moveChipToGameboard(moveCss, topMovement, leftMovement) {
	try {
		moveCss.insertRule("@-webkit-keyframes movechip { from { -webkit-transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {-webkit-transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
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
		moveCss.insertRule("@keyframes movechip { from {transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 90% {transform: rotateX(70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} 95% {transform: rotateX(110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} to {transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
		topMovement+ "px; left: " +
		leftMovement+ "px;} }",0) 
	} catch (e) {}
}
