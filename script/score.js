$(document).ready(function() {
	createScoreboard()
})

function createScoreboard() {
	$(scoreboardDiv()).insertAfter($('#game-wrapper'))
}

function scoreboardDiv() {
	var scoreboard = document.createElement('div')
	scoreboard.id = 'scoreboard'
	return scoreboard
}