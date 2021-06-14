const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

getRoom(room).then((response) => {
    outputRoomName(response.data.name)
  }).catch((e) => {
    console.debug(e)
})

getRoomMessages(room).then((response) => {
    if (response.data.length) {
      response.data.forEach(message => {
        outputMessage(message)
      })
    }
  }).catch((e) => {
    console.debug(e)
  })

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ users }) => {
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get message text
  let message = e.target.elements.msg.value;

  message = message.trim();

  if (!message) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', message);

  // save message into database
  const formattedMessage = formatMessage(message);
  await saveMessage(formattedMessage).catch((e) => {
    console.debug(e)
  })

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

function formatMessage(text) {
  return {
    text,
    username,
    roomId: room
  }
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
