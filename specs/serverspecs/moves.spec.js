var moves = require('../../server/moves.js')

describe("getting valid moves", function() {
	it("should give valid chip placements to black player", function() {
		var gamegrid = new moves.Gamegrid()
		var results = gamegrid.validPlacements('black')
		expect(results.length).toBe(4)
	})
	it("should give valid chip placements to white player", function() {
		var gamegrid = new moves.Gamegrid()
		var results = gamegrid.validPlacements('white')
		expect(results.length).toBe(4)
	})
})
