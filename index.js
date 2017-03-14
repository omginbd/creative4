var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var clickX = [], clickY = [], clickDrag = [], clickColor = [];


app.use(express.static('./'))


io.on('connection', function(socket){
    
    socket.on('addClick', function(data){
        clickX.push(coords.x)
        clickY.push(coords.y)
        clickDrag.push(drag)
        clickColor.push(curColor)
    })
 
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});