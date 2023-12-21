import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

let users = [];
let rooms = [];

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  let userIndex = users.findIndex((user) => user.id === socket.id);
  if (userIndex === -1) {
    const payload = {
      id: socket.id,
      name: socket.id,
      status: "online",
    };
    users.push(payload);
  }

  socket.on("add:user", (name) => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
      users[userIndex].name = name;
      io.emit(
        "get:user",
        users.find((user) => user.id === socket.id)
      );
    } else {
      io.emit("get:user", null);
    }
  });

  socket.on("add:room", (roomName) => {
    const payload = {
      roomName: roomName,
      messages: [],
    };
    rooms.push(payload);
    io.emit("get:room", payload);
  });

  socket.on("find:room", (roomName) => {
    const isHaveroom = rooms.find((room) => room.roomName === roomName);
    io.emit("find:room", isHaveroom ? roomName : "");
  });

  socket.on("chat:message", ({ message, roomId }) => {
    const indexRoom = rooms.findIndex((room) => room.roomName === roomId);
    if (indexRoom !== -1) {
      const userName = users.find((user) => user.id === socket.id).name;
      const payload = {
        text: message,
        userId: socket.id,
        userName: userName,
      };
      rooms[indexRoom].messages.push(payload);
      io.emit("get:message", rooms[indexRoom].messages);
    }
  });

  socket.on("get:message", (roomId) => {
    const indexRoom = rooms.findIndex((room) => room.roomName === roomId);
    if (indexRoom !== -1) {
      io.emit("get:message", rooms[indexRoom].messages);
    }
  });

  socket.on("disconnect", () => {
    const index = users.findIndex((user) => user.id === socket.id);
    users.splice(index, 1);

    io.emit("chat:room", {
      type: "leave",
      message: `user ${socket.id} disconnected`,
      users,
    });
  });
});

const APP_PORT = 5555;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

server.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});
