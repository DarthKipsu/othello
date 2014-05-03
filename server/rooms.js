var crypto = require('crypto')
var moves = require('./moves.js')

/**
 * Object containing all game rooms.
 * @constant {Object}
 */
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
			rooms[hash] = {
				black: socket.id,
				white: null,
				gamegrid: new moves.Gamegrid()
			}
		}
		if (io.sockets.clients(hash).length == 2 && checkIfStartingTurn(hash)) {
			rooms[hash].white = socket.id
			startGame(io, hash)
		} else if (io.sockets.clients(hash).length == 2 && checkIfStartingTurn(hash)==false) {
			if (rooms[hash].white == null) {
				rooms[hash].white = socket.id
				socket.broadcast.to(hash).emit('user reconnected', {user: 'white'})
			} else {
				rooms[hash].black = socket.id
				socket.broadcast.to(hash).emit('user reconnected', {user: 'black'})
			}
		}
		socket.on('disconnect', leaveRoom(io, socket, hash))
	}
}

exports.joinRoom = joinRoom

function checkIfStartingTurn(hash) {
	if ((rooms[hash].gamegrid.gamegrid[2][4]==undefined && rooms[hash].gamegrid.gamegrid[3][5]==undefined) &&
	    (rooms[hash].gamegrid.gamegrid[4][2]==undefined && rooms[hash].gamegrid.gamegrid[5][3]==undefined)) {
		return true
	} else return false
}

/**
 * Send a message for both players to begin the game.
 * @param {io} io
 * @param {string} hash - The room identificator.
 */
function startGame(io, hash) {
	io.sockets.socket(rooms[hash].black).emit('start game', 'black', rooms[hash].gamegrid.validPlacements('black'), hash) //moves.js
	io.sockets.socket(rooms[hash].white).emit('start game', 'white', rooms[hash].gamegrid.validPlacements('black'), hash) //moves.js
}

/**
 * Send players information in the end of a turn (to begin a new one.)
 * @param {io} io
 * @param {string} hash - The room identificator.
 * @returns {function} Function to emit turn changes and new turn valid movements.
 */
function endTurn(io, socket) {
	return function(player, coordinates, hash) {
		newPlayer = player=='black'?'white':'black'
		var makeMove = rooms[hash].gamegrid.makeMove(player, coordinates)
		var validPlacements = rooms[hash].gamegrid.validPlacements(newPlayer)

		if (validPlacements.length!=0) {
			emitTurnChange(io, socket, player, 'black', newPlayer, makeMove, hash)
			emitTurnChange(io, socket, player, 'white', newPlayer, makeMove, hash)
		} else if (rooms[hash].gamegrid.validPlacements(player).length!=0) {
			emitTurnChange(io, socket, player, 'black', player, makeMove, hash)
			emitTurnChange(io, socket, player, 'white', player, makeMove, hash)
		} else {
			io.sockets.socket(rooms[hash].black).emit('end of game', 'black', 
				player, makeMove, hash)
			io.sockets.socket(rooms[hash].white).emit('end of game', 'white', 
				player, makeMove, hash)
		}
	}
}

exports.endTurn = endTurn

function emitTurnChange(io, socket, player, color, nextTurn, makeMove, hash) {
	io.sockets.socket(rooms[hash][color]).emit('new turn', color, player, makeMove,
		rooms[hash].gamegrid.validPlacements(nextTurn), hash)
}

function leaveRoom(io, socket, hash) {
	return function() {
		var userLeaving = socket.id
		if (rooms[hash]!=undefined && (userLeaving==rooms[hash].black && rooms[hash].white!=null)) {
			rooms[hash].black = null
			socket.broadcast.to(hash).emit('user left', {user: 'black'})
		} else if (rooms[hash]!=undefined && (userLeaving==rooms[hash].white && rooms[hash].black!=null)) {
			rooms[hash].white = null
			socket.broadcast.to(hash).emit('user left', {user: 'white'})
		}
	}
}

exports.leaveRoom = leaveRoom
