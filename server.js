const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

app.use(express.static(path.resolve('public')))

const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const fetch = require('node-fetch')

let data;

const randomPokemon = async () => {
  let number = Math.floor(Math.random() * 151);
  const endpoint = `https://pokeapi.co/api/v2/pokemon/`
  const url = `${endpoint}` + number
  const pokeData = await fetchData(url)
  data = pokeData
  return data
}

async function fetchData(url){
  const apiData = await fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err))
  return apiData
};

app.get('/', (req, res) => {
  res.render('index');
});

let users = []

const historySize = 50
let history = []

io.on('connection', (socket) => {

  socket.emit('history', history)

  socket.on('new-user', name => {
    users[socket.id] = {
      username: name,
      points: 0,
      id: socket.id
    }

    socket.broadcast.emit('user-connected', name)
    updateUserList()
    randomPokemon()    
    .then(data  => {
      console.log(data.forms[0].name)
      io.emit('pokemon-connected', data)
    })
  })

  socket.on('typing', () => {
    socket.broadcast.emit("typing", { name: users[socket.id].username });
  });

  socket.on('send-chat-message', message => {
    console.log(message)

    while (history.length > historySize) {
      history.shift()
    }
    history.push({ message: message, name: users[socket.id].username })
    console.log(history)

    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id].username })

    if (message == data.name) {
      const name = users[socket.id].username
      io.emit('correct', { name: name, data: data.name })
      console.log('correct')
      console.log(users[socket.id].username)
      users[socket.id].points++
      updateUserList()
      getNewPokemon()
    }
  })

  socket.on("new-pokemon", ()=>{
    randomPokemon()
    .then(data  => {
        io.emit("random-pokemon", data)
        console.log(data.forms[0].name)
    })
  })

  socket.on('disconnect', () => {
    const name = users[socket.id]
    delete users[socket.id]
    socket.broadcast.emit('user-disconnected', name)
    updateUserList()
  })

  function updateUserList() {
    console.log(users)
    io.emit('user-list', Object.values(users))
  }
})

function getNewPokemon() {
  setTimeout(function () {
    randomPokemon()
      .then(data  => {
          io.emit("random-pokemon", data)
          console.log(data.forms[0].name)
    })
  }, 5000);
}

http.listen(port, () => {
  console.log('listening on port ', port)
})