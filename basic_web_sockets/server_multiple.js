const webSocket = require("ws");

const server = new webSocket.Server({ port: 8080 });
let clients = new Set();

server.on("connection", (socket) => {
  console.log("Client is connected");
  clients.add(socket);

  socket.on("message", (message) => {
    console.log(`message received from client ${message}`);
    socket.send(`Server has received the message: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected!!");
    clients.delete(socket);
  });
});

function broadcastMessage(message) {
  for (const client of clients) {
    if (client.readyState === webSocket.OPEN) {
      client.send(message);
    }
  }
}

setInterval(() => {
  broadcastMessage(
    "This is a broadcast message from the server sent every 2 seconds"
  );
}, 2000);

console.log("Websocket server is running on ws://localhost:8080");
