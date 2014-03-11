$(document).ready(function() {
	placeAChip()
})

function placeAChip() {

	var chipCount = document.getElementById('chip')
	
	if (chipCount < 4) {
		var playerChipslot = document.getElementById('player-chipslot') //target chipslot
		var childCount = playerChipslot.childElementCount //chip count for chipslot
		var lastChild = playerChipslot.childNodes[childCount - 1] //the last of the chips in the lot
		$(lastChild).css('animation', 'movechip 2s 1 forwards')

		var chipCurrentPosition = $(lastChild).position()
		var targetCell = $('#gamegrid tr:nth-child(4) td:nth-child(4)')
		var targetCellPosition = $(targetCell).position()
		var topMovement = targetCellPosition.top - chipCurrentPosition.top - 58
		var leftMovement = targetCellPosition.left - chipCurrentPosition.left - 26
		console.log(chipCurrentPosition.top, chipCurrentPosition.left)
		console.log(targetCellPosition.top, targetCellPosition.left)
	
		var style = document.createElement('style')
		style.appendChild(document.createTextNode(''))
		document.head.appendChild(style)
		var moveCss = style.sheet

		try {
			moveCss.insertRule("@-webkit-keyframes movechip { from { -webkit-transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {-webkit-transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			topMovement + "px; left: " +
			leftMovement + "px;} 90% {-webkit-transform: rotateX(70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			topMovement + "px; left: " +
			leftMovement + "px;} 95% {-webkit-transform: rotateX(110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			topMovement + "px; left: " +
			leftMovement + "px;} to { -webkit-transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			topMovement + "px; left: " +
			leftMovement + "px;} }",0) 
		} catch (e) {}
		try {
			moveCss.insertRule("@keyframes movechip { from {transform: rotateX(8deg) scale(0.8, 0.8); position: absolute; top: 0px; left: 0px;} 85% {transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			(topMovement-4) + "px; left: " +
			(leftMovement-8) + "px;} 90% {transform: rotateX(70deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			(topMovement-4) + "px; left: " +
			(leftMovement-8) + "px;} 95% {transform: rotateX(110deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			(topMovement-4) + "px; left: " +
			(leftMovement-8) + "px;} to {transform: rotateX(90deg) scale(0.7) scaleZ(0.7); position: absolute; top: " + 
			(topMovement-4) + "px; left: " +
			(leftMovement-8) + "px;} }",0) 
		} catch (e) {}
		console.log(moveCss)

		playerChipslot.removeChild(lastChild)
		$(targetCell).append('<span class="black">X</span>')
	}
}
