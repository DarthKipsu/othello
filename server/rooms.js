var crypto = require('crypto')

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
