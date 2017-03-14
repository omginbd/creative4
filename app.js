const RED = '#F00'
const GREEN = '#0F0'
const BLUE = '#00F'
const socket = io()

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let isDrawing = false

let clickX = []
let clickY = []
let clickDrag = []
let clickColor = []

let curColor = RED


function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function addClick(coords, drag) {
  clickX.push(coords.x)
  clickY.push(coords.y)
  clickDrag.push(drag)
  clickColor.push(curColor)
  socket.emit('addClick', {
      cordinates: coords,
      drag: drag,
      curColor: curColor,
  });
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clears the canvas
  context.lineJoin = "round"
  context.lineWidth = 5

  for (var i = 0; i < clickX.length; i++) {length
    context.beginPath()
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1])
    } else {
      context.moveTo(clickX[i]-1, clickY[i])
    }
    context.lineTo(clickX[i], clickY[i])
    context.closePath()
    context.strokeStyle = clickColor[i]
    context.stroke()
  }
}

canvas.addEventListener('mousedown', e => {
  isDrawing = true
  addClick(getCanvasCoords(e))
  redraw()
})

canvas.addEventListener('mousemove', e => {
  if (isDrawing) addClick(getCanvasCoords(e), true)
  redraw()
})

canvas.addEventListener('mouseup', e => {
  isDrawing = false
})

canvas.addEventListener('mouseleave', e => {
  isDrawing = false
})

document.getElementById('red').addEventListener('click', () => {
  curColor = RED
})

document.getElementById('green').addEventListener('click', () => {
  curColor = GREEN
})

document.getElementById('blue').addEventListener('click', () => {
  curColor = BLUE
})


 $(function () {
    $('canvas').getContext(function(){
      socket.emit('mousemove', );
      $('#canvas').val('');
      return false;
    });
    socket.on('mousemove', function(msg){
      $('#canvas').append();
    });
  });


//let clickX = []
//let clickY = []
//let clickDrag = []
//let clickColor = []