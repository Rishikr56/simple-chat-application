import http from "node:http";
import path from "node:path";
import express from "express";
import { Server } from "socket.io";

async function main() {
  const app = express();
  app.use(express.static(path.resolve("./public")));

  const server = http.createServer(app);
  const io = new Server();
  io.attach(server);

  io.on("connection", (socket) => {
    console.log("A new socket has connected with this id --> ", socket.id);

    socket.on("user:message", (data) => {
      console.log("message from socket ", data);
      socket.broadcast.emit("server:message",data);
    });
  });

  server.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

main();
