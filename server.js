const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
let date = new Date()
//Set static folder
let welcomemsg = {
  isCostumer: false,
  userId: '0521',
  msg: 'welcome to the chat',
  time: date.getTime(),
}
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  socket.emit('message', welcomemsg)
  //   listen for chatMessage
  socket.on('message', (msg) => {
    io.emit('message', msg)
  })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Sever running on port ${PORT}`))
