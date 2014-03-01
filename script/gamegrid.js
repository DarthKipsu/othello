$(document).ready(function() {
	createGameboard();
});

function createGameboard() {
	$('#game-wrapper').append(createChipSlot('player'), createChipSlot('opponent'), createGamegrid());
	$('#player-chipslot').append(createChips('player'));
	$('#opponent-chipslot').append(createChips('opponent'));
};

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
	var slot = document.createElement('div'); 
	slot.id = player + "-chipslot";
	return slot;
}

/*function createPlayerChipSlot() {
	var playerSlot = document.createElement('div'); // div for player chips
	playerSlot.id = "player-chipslot";
	return playerSlot;
}

function createOpponentChipSlot() {
	var opponentSlot = document.createElement('div'); // div for opponent chips
	opponentSlot.id = "opponent-chipslot";
	return opponentSlot;
}*/

function createChips(player) {
	var chipsArray = [];
	for (var i=0; i<32; i++) {
		var chip = document.createElement('div'); // game chips * 32
		chip.classList.add(player + '-unused');
		chipsArray.push(chip);
	};
	return chipsArray;
};
