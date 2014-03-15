var request = require('request')

describe("routing", function() {
	it("takes you to index page", function(done) {
		
		request("http://localhost:3000/", function(error, response, body) {
			expect(body).toContain('Othello')
			done()
		})

	})

})
