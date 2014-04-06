var gamegridArray = new Array(8)
for (var i=0; i<8; i++) {
	gamegridArray[i] = new Array(8)
}

/** Creates the gameboard including chipslots. */
function createGameboard() {
	$('#game-wrapper').append(createChipSlot('player'), createChipSlot('opponent'), createGamegrid());
};

/**
 * Places chips inside the player and opponent chipslots.
 * @param {string} playerColor - Either 'black' or 'white'.
 */
function callForChips(playerColor) {
	$('#player-chipslot').append(createChips(playerColor, 'player'));

	if (playerColor == 'black') addPlayerResources('black', 'white')
	else addPlayerResources('white', 'black')

	$('.chip').append(createChip3DLayers());
}

/**
 * Adds the opponents chips and tells the player which color they play with.
 * @param {string} player - The players color.
 * @param {string} opponent - The opponents color.
 */
function addPlayerResources(player, opponent) {
	$('#opponent-chipslot').append(createChips(opponent, 'opponent'));
	$('#player-color').append('(' + player + ' chips)')
	$('#opponent-color').append('(' + opponent + ' chips)')
}

/**
 * Creates gameboard chipslots for both player and the opponent.
 * @param {string} player - Either player or opponent.
 * @returns {div element} Chipslot div element.
 */
function createChipSlot (player) {
	var slot = document.createElement('div');
	slot.id = player + "-chipslot";
	return slot;
}


/**
 * Creates the grid in the middle of the gameboard.
 * @returns {table element} Table used as the gamegrid.
 */
function createGamegrid() {
	var gamegrid = document.createElement('table');
	gamegrid.id = 'gamegrid';
	addRowsToGamegrid(gamegrid);
	return gamegrid;
};

/**
 * Adds 8 rows to gameboard's gamegrid.
 * @param {table element} gamegrid - The gamegrid table element.
 */
function addRowsToGamegrid(gamegrid) {
	for (var i=1; i<9; i++) {
		var row = document.createElement('tr');
		addColumnsToGamegridRows(row, i);
		gamegrid.appendChild(row);
	};
};

/**
 * Adds 8 colums to gamegrid's row.
 * @param {row element} row - Row belonging into gamegrid table.
 * @param {number} number - Identifying which row the columns are added into.
 */
function addColumnsToGamegridRows(row, number) {
	for (var i=1; i<9; i++) {
		var column = document.createElement('td');
		$(column).data('row', number);
		$(column).data('column', i);
		row.appendChild(column);
	};
}

/**
 * Creates 32 chips to be inserted into the chipslots.
 * @param {string} playerColor - Players color.
 * @param {string} player - Are the chips being created to player or opponent chipslots.
 * @returns {array} 32 chips including their 3D layers.
 */
function createChips(playerColor, player) {
	var chipsArray = [];
	for (var i=0; i<32; i++) {
		var chip = document.createElement('div');
		chip.classList.add(playerColor + '-unused', 'chip');
		if (playerColor == 'black') {
			if (player == 'player') chip.id = 'b' + (31 -i)
			else chip.id = 'b' + i
		} else {
			if (player == 'player') chip.id = 'w' + (31 -i)
			else chip.id = 'w' + i
		}
		if (player == "opponent") {
			chip.style.zIndex = (50 - i);
		}
		chipsArray.push(chip);
	};
	return chipsArray;
};

/**
 * Creates layers for each chip to make them 3 dimensional.
 * @returns {array} Array of 14 side divs for the chips.
 */
function createChip3DLayers() {
	var chipSideArray = [];
	for (var i = 0; i < 14; i++) {
		var classArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
				  'nine', 'ten', 'eleven', 'twelve', 'top', 'bottom']
		var chipSide = document.createElement('div');
		chipSide.classList.add(classArray[i]);
		chipSideArray.push(chipSide);
	};
	return chipSideArray;
};
