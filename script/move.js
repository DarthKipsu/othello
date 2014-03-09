$(document).ready(function() {
	placeAChip()
})

function placeAChip() {

	var chipCount = document.getElementById('chip')
	
	if (chipCount < 4) {
		var playerChipslot = document.getElementById('player-chipslot')
		var childCount = playerChipslot.childElementCount
		playerChipslot.removeChild(playerChipslot.childNodes[childCount - 1])
		var targetCell = $('#gamegrid tr:nth-child(4) td:nth-child(4)')
		$(targetCell).append('<span class="black">X</span>')
	}
}
