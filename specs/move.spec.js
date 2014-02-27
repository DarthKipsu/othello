describe("move animation", function() {
	it("make sure it's black or white players turn", function() {
		expect(turn).toEqual("black"||"white")
	})
})

describe("first move", function() {
	
	var gameWrapperDiv;

	beforeEach(function() {
		$('body').empty();
		gameWrapperDiv = document.createElement('div');
		gameWrapperDiv.id = 'game-wrapper';
		document.body.appendChild(gameWrapperDiv);
	});

	it("removes one user chip from the chipslot", function() {
		createGameboard()
		placeFirstChips()
		expect($('#player-chipslot').children().length).toBe(31)
	})
})
