var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

const clicks = {}

app.use(express.static('./'))

io.on('connection', function(socket){
    clicks[socket.id] = []
    socket.on('addClick', function(data){
      clicks[socket.id].push(data)
      io.emit('clickadded', clicks);
    })

    socket.on('clear-me', function(data) {
      clicks[data] = []
      io.emit('clickadded', clicks)
    })

    socket.on('clear-everything', function(data) {
      for (const id in clicks) {
        clicks[id] = []
      }  
      io.emit('clickadded', clicks)
    })

    io.sockets.connected[socket.id].emit('clickadded', clicks)
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
