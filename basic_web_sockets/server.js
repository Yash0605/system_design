const webSocket = require("ws");

const server = new webSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client is connected");

  socket.on("message", (message) => {
    console.log(`message received from client ${message}`);
    socket.send(`Server has received the message: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected!!");
  });
});

console.log("Websocket server is running on ws://localhost:8080");
