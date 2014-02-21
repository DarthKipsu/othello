describe("Gameboard creation", function() {
	var result = createGamegrid();
	it("creates a table with id gamegrid", function() {
		expect(result).toEqual(jasmine.any(HTMLTableElement));
		expect(result.id).toEqual('gamegrid');
	});
	it("creates eight rows in the table", function() {
		var trs = result.children;
		expect(trs.length).toEqual(8);
		for (var i=0; i<trs.length; i++) {
			expect(trs[i]).toEqual(jasmine.any(HTMLTableRowElement));
		};
	});
	it("creates eight columns in the table with data-attributes presenting rows and columns", function() {
		var tds = result.querySelectorAll('td');
		expect(tds.length).toEqual(8 * 8);
		for (var i=0; i<tds.length; i++) {
			expect(tds[i]).toEqual(jasmine.any(HTMLTableCellElement));
			expect($(tds[i]).data('row')).toEqual(Math.ceil((i + 1) / 8));
			expect($(tds[i]).data('column')).toEqual((i + 1) - (Math.floor(i / 8)*8));
		};
	});
});