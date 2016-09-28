var http = require('http');
var app = http.createServer(function(req, res) {
});
var io = require('socket.io').listen(app);
var imagen;

io.on('connection', function(socket) {
console.log('Hola.');
io.sockets.emit('imagen',{image:imagen});
socket.on('imagen', function(data){
imagen=data.image;
io.sockets.emit('imagen',{image:imagen});
});
});

app.listen(3000);
