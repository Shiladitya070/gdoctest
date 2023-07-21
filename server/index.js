const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: ["http://localhost:5173", "http://192.168.1.105:5173"],
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("edit", (data) => {
    console.log(data, "now send this");
    socket.broadcast.emit("editcomes", data);
    socket.emit("editcomes", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
