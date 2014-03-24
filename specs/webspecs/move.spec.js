describe("turns are working", function() {
	it("make sure game starts with black turn", function() {
		beginTurns('black')
		expect(turn).toEqual("black")
	})
})
