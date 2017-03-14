const RED = '#F00'
const GREEN = '#0F0'
const BLUE = '#00F'
const socket = io('http://ec2-52-32-25-223.us-west-2.compute.amazonaws.com:3000')

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let isDrawing = false

let clicks = {}

let curColor = RED

function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function addClick(coords, drag) {
  const click = {
    x: coords.x,
    y: coords.y,
    drag,
    color: curColor
  }
  socket.emit('addClick', click);
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clears the canvas
  context.lineJoin = "round"
  context.lineWidth = 5

  for (var user in clicks) {
    for (var i = 0; i < clicks[user].length; i++) {length
      context.beginPath()
      if (clicks[user][i].drag && i) {
        context.moveTo(clicks[user][i-1].x, clicks[user][i-1].y)
      } else {
        context.moveTo(clicks[user][i].x - 1, clicks[user][i].y)
      }
      context.lineTo(clicks[user][i].x, clicks[user][i].y)
      context.closePath()
      context.strokeStyle = clicks[user][i].color
      context.stroke()
    }
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

document.getElementById('red').addEventListener('click', e => {
  curColor = RED
  document.getElementById('green').className = ''
  document.getElementById('blue').className = ''
  e.target.className = "selected"
})

document.getElementById('green').addEventListener('click', e => {
  document.getElementById('red').className = ''
  document.getElementById('blue').className = ''
  e.target.className = "selected"
  curColor = GREEN
})

document.getElementById('blue').addEventListener('click', e => {
  document.getElementById('red').className = ''
  document.getElementById('green').className = ''
  e.target.className = "selected"
  curColor = BLUE
})

document.getElementById('clear-me').addEventListener('click', () => {
  socket.emit('clear-me', socket.id)
})

document.getElementById('clear-everything').addEventListener('click', () => {
  socket.emit('clear-everything', socket.id)
})

socket.on('clickadded' , function(data){
    clicks = data
    redraw()
});
