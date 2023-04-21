const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

const historySize = 50
let history = []

app.use(express.static(path.resolve('public')))

// database
// const connectDB = require('./config/db');
// connectDB();

io.on('connection', (socket) => {
  console.log('a user connected')
  io.emit('history', history)

  // socket.on('message', (message) => {
  //   while (history.length > historySize) {
  //     history.shift()
  //   }
  //   history.push(message)
  //   console.log('message')

  //   io.emit('message', message)
  // })

  socket.on('chat', (data) => {
    console.log(data);

    while (history.length > historySize) {
        history.shift()
      }
      history.push(data)

    //data from script.js (name and message)
    io.sockets.emit("chat", data);
  });

  socket.on('typing', (inputName) => {
    console.log("Aan het typen");
    socket.broadcast.emit("typing", inputName);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// io.on('connection', (socket) => {
//   socket.on('send-nickname', (nickname) => {
//       socket.nickname = nickname;
//       io.emit("send-nickname", socket.nickname);
//   });
// });

http.listen(port, () => {
  console.log('listening on port ', port)
})
