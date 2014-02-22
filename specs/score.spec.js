describe("scoreboard creation", function() {

	var gameWrapperDiv, scoreboard

	beforeEach(function() {
		gameWrapperDiv = document.createElement('div')
		gameWrapperDiv.id = 'game-wrapper'
		document.body.appendChild(gameWrapperDiv)
		scoreboard = scoreboardDiv()
	})

	it("creates scoreboard div", function() {
		expect(scoreboard).toEqual(jasmine.any(HTMLDivElement))
	})
})