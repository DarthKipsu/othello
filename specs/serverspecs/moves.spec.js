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
		gamegrid.addNewChip('black', {emptyRow:5, emptyCol:3, playerRow:3, playerCol:3, rowOffset:-1, colOffset:0})
		expect(gamegrid.gamegrid[4][3]).toBe('black')
		expect(gamegrid.gamegrid[5][3]).toBe('black')
	})
	it("should remove one white chip and add two black chips, second situation", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2, playerRow:4, playerCol:4, rowOffset:0, colOffset:1})
		expect(gamegrid.gamegrid[4][2]).toBe('black')
		expect(gamegrid.gamegrid[4][3]).toBe('black')
	})
})

describe("second turn", function() {
	it("should give three valid placements for white player", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:4, emptyCol:2, playerRow:4, playerCol:4, rowOffset:0, colOffset:1})
		var results = gamegrid.validPlacements('white')
		expect(results.length).toBe(3)
	})
})

describe("two straights situation", function() {
	it("should rotate two white chips to black", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:4, playerRow:4, playerCol:4, rowOffset:1, colOffset:0})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:3, playerRow:4, playerCol:3, rowOffset:1, colOffset:0})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:2, playerRow:2, playerCol:4, rowOffset:0, colOffset:1})
		expect(gamegrid.gamegrid[2][3]).toBe('black')
		expect(gamegrid.gamegrid[3][3]).toBe('black')
		expect(gamegrid.gamegrid[4][3]).toBe('white')
	})
})

describe("two straights situation", function() {
	it("should rotate two white chips to black", function() {
		var gamegrid = new moves.Gamegrid()
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:4, playerRow:4, playerCol:4, rowOffset:1, colOffset:0})
		gamegrid.addNewChip('white', {emptyRow:2, emptyCol:3, playerRow:4, playerCol:3, rowOffset:1, colOffset:0})
		gamegrid.addNewChip('black', {emptyRow:2, emptyCol:2, playerRow:2, playerCol:4, rowOffset:0, colOffset:1})
		console.log('Valid placements white', gamegrid.validPlacements('white'))
		gamegrid.addNewChip('white', {emptyRow:1, emptyCol:3, playerRow:4, playerCol:3, rowOffset:-1, colOffset:0})
		console.log(gamegrid)
		console.log('Valid placements black', gamegrid.validPlacements('black'))
		expect(gamegrid.gamegrid[1][3]).toBe('white')
		expect(gamegrid.gamegrid[2][3]).toBe('white')
		expect(gamegrid.gamegrid[3][3]).toBe('white')
		expect(gamegrid.gamegrid[4][3]).toBe('white')
	})
})
