describe("chage score according to how many chips on board", function() {
	
	beforeEach(function(done) {
		scoreSpans()
		createGameboard()
		callForChips('black')
		first4Chips()
		setTimeout(done,3500)
	})

	it("gives points based on how many chips are on board", function() {
		var whiteChipCount = document.querySelectorAll('.white')
		var blackChipCount = document.querySelectorAll('.black')

		expect(whiteChipCount.length).toBe(2)
		expect(blackChipCount.length).toBe(2)
		expect(document.getElementById('player-score').innerHTML).toEqual('2')
		expect(document.getElementById('opponent-score').innerHTML).toEqual('2')
	})
})

function scoreSpans() {
	$('body').empty()
	var gameWrapperDiv = document.createElement('div')
	gameWrapperDiv.id = 'game-wrapper'
	var playerScoreSpan = document.createElement('span')
	playerScoreSpan.id = 'player-score'
	playerScoreSpan.innerHTML = '0'
	var opponentScoreSpan = document.createElement('span')
	opponentScoreSpan.id = 'opponent-score'
	opponentScoreSpan.innerHTML = '0'
	document.body.appendChild(gameWrapperDiv)
	document.body.appendChild(playerScoreSpan)
	document.body.appendChild(opponentScoreSpan)
}
