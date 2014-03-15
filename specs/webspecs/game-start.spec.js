describe("game start", function() {

	var result
	beforeEach(function() {
		$('body').empty();
		result = popupDiv()
	})

	it("creates a popup on game start", function() {
		expect(result).toEqual(jasmine.any(HTMLDivElement))
		expect(result.id).toEqual('game-start')
	})
})
