var moves = require('../../server/moves.js')

describe("getting valid moves", function() {
	it("should give valid chip placements to black player", function() {
		var results = moves.validPlacements('black')
		expect(results.length).toBe(4)
	})
	it("should give valid chip placements to white player", function() {
		var results = moves.validPlacements('white')
		expect(results.length).toBe(4)
	})
})
