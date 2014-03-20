var crypto = require('crypto')

var rooms = []

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
		console.log('JOINED ROOM: ' + hash)
		if (io.sockets.clients(hash).length == 2) io.sockets.in(hash).emit('start game')
		console.log('CLIENTS IN ROOM ' + hash + ': ' + io.sockets.clients(hash).length)
	}
}

exports.joinRoom = joinRoom
