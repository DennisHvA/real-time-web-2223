let socket = io()

let messages = document.querySelector('section ul');
let inputText = document.querySelector('input#message');
let inputName = document.querySelector('input#name');
let send = document.querySelector('button#send');
let typingState = document.querySelector('p');

const form = document.querySelector('form');
// let messages = document.querySelector('section ul')
// let input = chat.querySelector('input')

form.addEventListener('submit', event => {
  event.preventDefault()
  // if (input.value) {
    let data = { time: getTime(), name: inputName.value, message: inputText.value }
    // With emit create component
    socket.emit('chat', data);

    console.log(inputName.value, inputText.value);
    // socket.emit('message', input.value)
    // input.value = ''
    inputText.value = '';
  // }
})

socket.on('user-joined', (username) => {
  addChat({ sender: 'Server', time: getTime(), content: `${username} joined the chat` });
  typingState.innerHTML= "";
});

inputText.addEventListener('keypress', () => {
  socket.emit('typing', inputName.value)
})

socket.on('chat', (data) => {
  console.log(data);
  addChat(data)
  typingState.innerHTML= "";
})

socket.on('typing', (inputName) => {
  console.log(inputName);
  typingState.innerHTML= ( inputName + " is aan het typen...")
  setTimeout(() => {
    typingState.innerHTML= "";
  }, 3000);
})

// socket.on('history', (history) => {
//   history.forEach((message) => {
//     addMessage(message)
//   })
// })

socket.on('history', (history) => {
  history.forEach((data) => {
    addChat(data)
  })
})

// socket.on('message', (message) => {
//   addMessage(message)
// })

// socket.on('history', (history) => {
//   history.forEach((message) => {
//     addMessage(message)
//   })
// })

// function addMessage(message) {
//   const messageLi = document.createElement('li');
//   messages.appendChild(Object.assign(messageLi, { textContent: message }))
//   messages.scrollTop = messages.scrollHeight
// }

function addChat(data) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.time + ': ' + data.name + ': ' + data.message }))
  messages.scrollTop = messages.scrollHeight
}

// function username() {
//   let text;
//   let nickname = prompt("Name:", "");
//   if (nickname == null || nickname == "") {
//       text = "User cancelled the prompt.";
//   } else {
//       socket.emit('send-nickname', nickname);
//   }
// }

// username();

function getTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
}