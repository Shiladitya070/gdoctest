const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: ["http://localhost:5173", "http://192.168.1.105:5173"],
});

app.use(express.json());

let rooms = [];

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join", (data) => {
    socket.join(data);
    if (!rooms.some((room) => room.roomId === data)) {
      rooms.push({ roomId: data, doc: "" });
    }
    const roomIndex = rooms.findIndex((room) => room.roomId === data);

    socket.emit("editcomes", { roomId: data, text: rooms[roomIndex].doc });

    console.log("🛖🛖", rooms);
    console.log(`${socket.id} joined at ${data}`);
  });
  socket.on("edit", (data) => {
    const { roomId, text } = data;
    const roomIndex = rooms.findIndex((room) => room.roomId === roomId);

    rooms[roomIndex].doc = text;

    console.log("🏠", rooms);
    socket.broadcast.emit("editcomes", { roomId, text: rooms[roomIndex].doc });
    socket.emit("editcomes", { roomId, text: rooms[roomIndex].doc });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
