var crypto = require('crypto')
var moves = require('./moves.js')

var rooms = {}

/**
 * Creates a new game room for a new game.
 * @param {socket} socket
 * @returns {string} Individual hash for identificating the room.
 */
function newRoom(socket) {
	var hash = createHash(socket)
	return hash
}

exports.newRoom = newRoom

/**
 * Create a hash to give individual identification for rooms.
 * @param {socket} socket
 * @returns {string} Individual hash for identificating rooms.
 */
function createHash(socket) {
	var time = new Date()
	var ip = socket.handshake.address
	var shaSum = crypto.createHash('sha1')
	shaSum.update(time.getTime().toString())
	shaSum.update(ip.address.toString())
	return shaSum.digest('hex')
}

/**
 * Add a player to a room and assign a color.
 * @param {io} io
 * @param {socket} socket
 * @returns {function} Function to leave the players old room and join the game room.
 */
function joinRoom(io, socket) {
	return function (hash, oldRoom) {
		socket.leave(oldRoom)
		socket.join(hash)
		if (io.sockets.clients(hash).length == 1) {
			rooms[hash] = []
			addPlayerObjectToRoom(socket, hash, 'black')
		}
		if (io.sockets.clients(hash).length == 2) {
			addPlayerObjectToRoom(socket, hash, 'white')
			startGame(io, hash)
		}
	}
}

exports.joinRoom = joinRoom

/**
 * Adds the player to a room as an object for identification.
 * @param {socket} socket
 * @param {string} hash - The room identificator.
 * @param {string} playerColor - Color of the player being added.
 */
function addPlayerObjectToRoom(socket, hash, playerColor) {
	rooms[hash].push({
		clientId: socket.id,
		player: playerColor
	})
}

/**
 * Send a message for both players to begin the game.
 * @param {io} io
 * @param {string} hash - The room identificator.
 */
function startGame(io, hash) {
	rooms[hash].gamegrid = new moves.Gamegrid()
	for (var i=0; i<2; i++) {
		var clientId = rooms[hash][i].clientId
		var playerColor = rooms[hash][i].player
		io.sockets.socket(clientId).emit('start game', playerColor,
			rooms[hash].gamegrid.validPlacements('black'), hash) //moves.js
	}
}

function endTurn(io, socket) {
	return function(player, coordinates, hash) {
		rooms[hash].gamegrid.makeMove(player, coordinates)
	}
}

exports.endTurn = endTurn
