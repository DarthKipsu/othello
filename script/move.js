$(document).ready(function() {
	placeFirstChips()
})

function placeFirstChips() {

	var chipCount = document.getElementById('chip')
	
	if (chipCount < 4) {
		var playerChipslot = document.getElementById('player-chipslot')
		var lastChild = playerChipslot.childElementCount
		playerChipslot.removeChild(playerChipslot.childNodes[lastChild - 1])
	}
}
