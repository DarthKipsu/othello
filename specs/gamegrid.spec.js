describe("Gamegrid creation", function() {
	it("creates a table", function() {
		var result = createTable();
		expect(result).toEqual(jasmine.any(HTMLElement));
		expect(result.nodeName).toEqual('TABLE');
	});
});