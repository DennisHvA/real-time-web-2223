let socket = io()

const formName = document.querySelector('form#name');
const formChat = document.querySelector('form#chat');

let messages = document.querySelector('ul#chat');
let userlist = document.querySelector('ul#users');
let inputText = document.querySelector('input#message');
let inputName = document.querySelector('input#name');
let send = document.querySelector('button#send');
let typingState = document.querySelector('.chat p');
let pokemonImage = document.querySelector('.pokemon > img');
let pokemonName = document.querySelector('.pokemon h1');
let pokemonQM = document.querySelector('.pokemon .qmark');

const dialog = document.querySelector("dialog");
dialog.showModal();

const audio = new Audio('../audio/whois.mp3');

socket.on('chat-message', data => {
  appendMessage(`${getTime()}: ${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${getTime()}: ${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${getTime()}: ${name.username} disconnected`)
})

socket.on('pokemon-connected', data => {
  pokemonImage.src = data.sprites.other.dream_world.front_default
  pokemonImage.alt = "pokemon image"
  audio.play();
})

socket.on('typing', data => {
  typingState.textContent = ( `${data.name} is typing...`)
  console.log(typingState)
  setTimeout(() => {
    typingState.innerHTML = "";
  }, 3000);
})

socket.on('user-list', users => {
  userlist.innerHTML = ''
  users.forEach(user => {
    const userElement = document.createElement('li')
    userElement.textContent = user.username + `: ` + user.points
    userlist.appendChild(userElement)
  })
})

socket.on("correct", (data) => {
  appendMessage(`${data.name} guessed correctly!`)
  pokemonImage.style.filter = "brightness(100%)"
  pokemonName.textContent = data.data
  pokemonQM.style.display = "none"
  // getNewPokemon()
})

// function getNewPokemon() {
//   setTimeout(function () {
//     socket.emit("new-pokemon");
//   }, 5000);
// }

socket.on("random-pokemon", data => {
  pokemonImage.src = ""
  pokemonImage.style.filter = "brightness(0%)"
  pokemonQM.style.display = "block"

  pokemonName.textContent = ""

  pokemonImage.src = data.sprites.other.dream_world.front_default
  pokemonImage.alt = "pokemon image" 
})

inputText.addEventListener('keypress', () => {
  socket.emit('typing', inputName.value)
})

socket.on('history', (history) => {
  history.forEach((message) => {
    // appendMessage(message)
    appendMessage(`${getTime()}: ${message.name}: ${message.message}`)
  })
})

formName.addEventListener('submit', event => {
  event.preventDefault()
    let name = inputName.value
    appendMessage('You joined')
    socket.emit('new-user', name)
    dialog.close();
    dialog.style.display = "none";
})

formChat.addEventListener('submit', event => {
  event.preventDefault()
  if (socket.connected) {
    const message = inputText.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    inputText.value = ''
  } else {
    console.log('No connection');
    appendMessage('No connection, please try again later')
  }
})

function appendMessage(message) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
}

function getTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
}

const date = new Date().getFullYear();
document.querySelector('time').innerHTML = date;

if (socket.connected) {
  socket.emit( /* ... */ );
} else {
  console.log('No connection');
  appendMessage('No connection, please try again later')
}