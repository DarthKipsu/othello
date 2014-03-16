var crypto = require('crypto')

function newRoom(socket) {
	var time = new Date()
	var ip = socket.handshake.address
	var shaSum = crypto.createHash('sha1')
	shaSum.update(time.getTime().toString())
	shaSum.update(ip.address.toString())
	var hash = shaSum.digest('hex')
	socket.join(hash)
	socket.emit('room', hash)
}

exports.newRoom = newRoom
