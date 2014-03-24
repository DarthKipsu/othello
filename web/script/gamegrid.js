$(document).ready(function() {
	createGameboard();
});

function createGameboard() {
	$('#game-wrapper').append(createChipSlot('player'), createChipSlot('opponent'), createGamegrid());
};

function callForChips(playerColor) {
	$('#player-chipslot').append(createChips(playerColor, 'player'));

	if (playerColor == 'black') addPlayerResources('black', 'white')
	else addPlayerResources('white', 'black')

	$('.chip').append(createChip3DLayers());
}

function addPlayerResources(player, opponent) {
		$('#opponent-chipslot').append(createChips(opponent, 'opponent'));
		$('#player-color').append('(' + player + ' chips)')
		$('#opponent-color').append('(' + opponent + ' chips)')
}

function createGamegrid() {
	var gamegrid = document.createElement('table'); // gamegrid table element
	gamegrid.id = 'gamegrid';
	addRowsToGamegrid(gamegrid);
	return gamegrid;
};

function addRowsToGamegrid(gamegrid) {
	for (var i=1; i<9; i++) {
		var row = document.createElement('tr'); // gamegrid row tr element
		addColumnsToGamegridRows(row, i);
		gamegrid.appendChild(row);
	};
};

function addColumnsToGamegridRows(row, number) {
	for (var i=1; i<9; i++) {
		var column = document.createElement('td'); // gamegrid column td element
		$(column).data('row', number);
		$(column).data('column', i);
		row.appendChild(column);
	};
}

function createChipSlot (player) {
	var slot = document.createElement('div'); // slots for keeping unused chips
	slot.id = player + "-chipslot";
	return slot;
}

function createChips(playerColor, player) {
	var chipsArray = [];
	for (var i=0; i<32; i++) {
		var chip = document.createElement('div'); // game chips * 32
		chip.classList.add(playerColor + '-unused', 'chip');
		if (player == "opponent") {
			chip.style.zIndex = (50 - i);
		}
		chipsArray.push(chip);
	};
	return chipsArray;
};

function createChip3DLayers() {
	var chipSideArray = [];
	for (var i = 0; i < 14; i++) {
		var classArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
				  'nine', 'ten', 'eleven', 'twelve', 'top', 'bottom']
		var chipSide = document.createElement('div'); // chip side pieces
		chipSide.classList.add(classArray[i]);
		chipSideArray.push(chipSide);
	};
	return chipSideArray;
};
