$(document).ready(function() {
	createGameboard();
});

function createGamegrid() {
	var table = document.createElement('table');
	table.id = 'gamegrid';
	for (var i=1; i<9; i++) {
		var tr = document.createElement('tr');
		for (var j=1; j<9; j++) {
			var td = document.createElement('td');
			$(td).data('row', i);
			$(td).data('column', j);
			tr.appendChild(td);
		};
		table.appendChild(tr);
	}
	return table;
};

function createGameboard() {
	$('#game-wrapper').append(createGamegrid());
};