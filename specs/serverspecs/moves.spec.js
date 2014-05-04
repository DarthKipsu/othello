var moves = require('../../server/moves.js')

describe("game starting position", function() {
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

describe("first turn", function() {
	it("should remove one white chip and add two black chips", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:5, emptyCol:3})
		expect(gamegrid.gamegrid[4][3]).toBe('black')
		expect(gamegrid.gamegrid[5][3]).toBe('black')
	})
	it("should remove one white chip and add two black chips, second situation", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2})
		expect(gamegrid.gamegrid[4][2]).toBe('black')
		expect(gamegrid.gamegrid[4][3]).toBe('black')
	})
})

describe("second turn", function() {
	it("should give three valid placements for white player", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2})
		var results = gamegrid.validPlacements('white')
		expect(results.length).toBe(3)
	})
})

describe("two straights situation", function() {
	it("should rotate two white chips to black", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:4})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:3})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:2})
		expect(gamegrid.gamegrid[2][3]).toBe('black')
		expect(gamegrid.gamegrid[3][3]).toBe('black')
		expect(gamegrid.gamegrid[4][3]).toBe('white')
	})
})

describe("chip is close to edge", function() {
	it("should be able to place a chip close to the edge", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:4})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:3})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:2})
		gamegrid.addNewChip('white', {emptyRow:1, emptyCol:3})
		expect(gamegrid.gamegrid[1][3]).toBe('white')
		expect(gamegrid.gamegrid[2][3]).toBe('white')
		expect(gamegrid.gamegrid[3][3]).toBe('white')
		expect(gamegrid.gamegrid[4][3]).toBe('white')
	})
})

describe("rotating two white chips diagonally", function() {
	it("should rotate two white chips to black", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2})
		gamegrid.addNewChip('white', {emptyRow:5, emptyCol:2})
		gamegrid.addNewChip('black', {emptyRow:5, emptyCol:3})
		gamegrid.addNewChip('white', {emptyRow:3, emptyCol:2})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:1})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:2})
		var newMoves = gamegrid.addNewChip('black', {emptyRow:1, emptyCol:1})
		expect(newMoves.rotatedChips).toEqual([[2,2],[3,3]])
	})
})

describe("bottom row placements", function() {
	it("should assign two top black chips to be rotated", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2})
		gamegrid.addNewChip('white', {emptyRow:5, emptyCol:2})
		gamegrid.addNewChip('black', {emptyRow:5, emptyCol:3})
		gamegrid.addNewChip('white', {emptyRow:3, emptyCol:2})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:1})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:2})
		gamegrid.addNewChip('black', {emptyRow:1, emptyCol:1})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:4})
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:5})
		var newMoves = gamegrid.addNewChip('white', {emptyRow:6, emptyCol:3})
		expect(newMoves.rotatedChips).toEqual([[5,3],[4,3]])
	})
})
