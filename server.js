var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

var rooms = require('./server/rooms.js')

server.listen(3000)

app.get('/', function(request, response){
	response.sendfile(__dirname + '/web/index.html')
})

app.use(express.static(__dirname + '/web'))

io.sockets.on('connection', function(socket) {

	var newRoom = rooms.newRoom(socket)
	socket.emit('room', newRoom)
	socket.on('joinRoom', rooms.joinRoom(io, socket))
})
