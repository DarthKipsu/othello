$(document).ready(function() {
	placeAChip()
})

function placeAChip() {

	var chipCount = document.getElementById('chip')
	
	if (chipCount < 4) {
		var playerChipslot = document.getElementById('player-chipslot') //target chipslot
		var childCount = playerChipslot.childElementCount //chip count for chipslot
		var lastChild = playerChipslot.childNodes[childCount - 1] //the last of the chips in the lot
		$(lastChild).css('animation', 'movechip 2s 1')

		var chipCurrentPosition = $(lastChild).position()
		var targetCell = $('#gamegrid tr:nth-child(4) td:nth-child(4)')
		var targetCellPosition = $(targetCell).position()
		console.log(chipCurrentPosition.top, chipCurrentPosition.left)
		console.log(targetCellPosition.top, targetCellPosition.left)
	
		var style = document.createElement('style')
		style.appendChild(document.createTextNode(''))
		document.head.appendChild(style)
		var moveCss = style.sheet

		try {
			moveCss.insertRule("@-webkit-keyframes movechip { from { -webkit-transform: rotateX(8deg) scale(0.8, 0.8); } to { -webkit-transform: rotateX(90deg) scale(0.8, 0.8); } }",0) 
		} catch (e) {}
		try {
			moveCss.insertRule("@keyframes movechip { from { transform: rotateX(8deg) scale(0.8, 0.8); } to { transform: rotateX(90deg) scale(0.8, 0.8); } }",0) 
		} catch (e) {}
		console.log(moveCss)

		playerChipslot.removeChild(lastChild)
		$(targetCell).append('<span class="black">X</span>')
	}
}
