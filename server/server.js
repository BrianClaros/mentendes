var http = require('http');
var app = http.createServer(function(req, res) {
});
var io = require('socket.io').listen(app);
var imagen, dibujante='nulo';
var palabras=[
		'barco',
		'avion',
		'radio',
		'telescopio',
		'microscopio'
			];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var palabra=palabras[getRandomInt(0,palabras.length)];
var guiones;

function actualizar (){
guiones='';
palabra=palabras[getRandomInt(0,palabras.length)];
for(var i in palabra){
guiones=guiones+'_';
}
}

actualizar();

console.log(palabra);

io.on('connection', function(socket) {


	io.sockets.emit('imagen',{image:imagen});

	io.sockets.emit('dibuja',{palabra:palabra});

	io.sockets.emit('espectador',{palabra:guiones});

	socket.on('hola', function (data){
				if(dibujante=='nulo'){
				dibujante=data.nombre;
				io.sockets.emit(data.nombre, {ok:1});
				console.log(dibujante);
				}else{
				io.sockets.emit(data.nombre,{ok:0});
				}
	});

	socket.on('imagen', function(data){
					imagen=data.image;
					io.sockets.emit('imagen',{image:imagen});
					});

	socket.on('cambio',function(){
					console.log('cambio');
					actualizar();
					io.sockets.emit('dibuja',{palabra:palabra});
					io.sockets.emit('espectador',{palabra:guiones});
					});

	socket.on('respuesta', function(data){
		if (data.palabra==palabra){
		io.sockets.emit('ganador', {nombre: data.nombre, palabra:palabra});
							actualizar();
}
//else
});



	socket.on('chau', function(data){dibujante='nulo';io.sockets.emit('chau', {nombre: data.nombre})});

});


app.listen(3000);
