describe("turns are working", function() {
	it("make sure game starts with black turn", function() {
		expect(turn).toEqual("black")
	})
})

describe("move animation", function() {
	
	var gameWrapperDiv

	beforeEach(function() {
		$('body').empty()
		gameWrapperDiv = document.createElement('div')
		gameWrapperDiv.id = 'game-wrapper'
		document.body.appendChild(gameWrapperDiv)
	})

	it("removes one user chip from the chipslot", function() {
		createGameboard()
		placeAChip()
		expect($('#player-chipslot').children().length).toBe(31)
	})

	it("adds one user chip to the gameboard", function() {
		createGameboard()
		placeAChip()
		blackChipsOnGameboard = $('.black')
		expect(blackChipsOnGameboard.length).toBe(1)
	})
})
