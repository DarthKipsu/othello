var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

var rooms = require('./server/rooms.js')
var moves = require('./server/moves.js')

server.listen(3000)

app.get('/', function(request, response){
	response.sendfile(__dirname + '/web/index.html')
})

app.use(express.static(__dirname + '/web'))

io.sockets.on('connection', function(socket) {

	var newRoom = rooms.newRoom(socket)
	socket.emit('room', newRoom) //rooms.js
	socket.on('joinRoom', rooms.joinRoom(io, socket)) //rooms.js
	socket.on('turn end', rooms.endTurn(io, socket)) //rooms.js
})
