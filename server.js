const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const moment = require('moment');
const formatMessage = require('./utils/messages');
const query = require('./database/query')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const botName = 'Chat Bot';

app.get("/rooms", async (req, res, next) => {
  const rooms = await query.getRooms()
  res.status(200);
  res.json(rooms);
  res.end();
});

app.get("/room", async (req, res, next) => {
  const room = await query.getRoom(req.query.room)
  res.status(200);
  res.json(room);
  res.end();
});

app.get("/messages", async (req, res, next) => {
  const messages = await query.getRoomMessages(req.query.room)
  res.status(200);
  res.json(messages);
  res.end();
});

app.post("/message", async (req, res, next) => {
  const message = {
    ...req.body.data.message,
    time: moment().format('HH:mm')
  }
  await query.saveMessage(message)
  res.status(200);
  res.end();
});

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});
