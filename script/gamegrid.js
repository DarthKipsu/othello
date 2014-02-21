$(document).ready(function() {
	createGameboard();
});

function createGameboard() {
	$('#game-wrapper').append(createPlayerSlot(), createOpponentSlot(), createGamegrid());
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

function createPlayerSlot() {
	var playerSlot = document.createElement('div');
	playerSlot.id = "player-slot";
	return playerSlot;
}

function createOpponentSlot() {
	var opponentSlot = document.createElement('div');
	opponentSlot.id = "opponent-slot";
	return opponentSlot;
}