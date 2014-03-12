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
})
