var express = require('express')

var app = express()

app.get('/', function(request, response){
	response.sendfile(__dirname + '/web/index.html')
})

app.use(express.static(__dirname + '/web'))

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port)
})