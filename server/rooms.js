var crypto = require('crypto')

var rooms = {}

function newRoom(socket) {
	var hash = createHash(socket)
	return hash
}

exports.newRoom = newRoom

function createHash(socket) {
	var time = new Date()
	var ip = socket.handshake.address
	var shaSum = crypto.createHash('sha1')
	shaSum.update(time.getTime().toString())
	shaSum.update(ip.address.toString())
	return shaSum.digest('hex')
}

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

function addPlayerObjectToRoom(socket, hash, playerColor) {
	rooms[hash].push({
		clientId: socket.id,
		player: playerColor
	})
}

function startGame(io, hash) {
	for (var i=0; i<2; i++) {
		var clientId = rooms[hash][i].clientId
		var playerColor = rooms[hash][i].player
		io.sockets.socket(clientId).emit('start game', playerColor)
	}
}
