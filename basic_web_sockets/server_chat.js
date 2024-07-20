const webSocket = require("ws");

const server = new webSocket.Server({ port: 8080 });
let clients = new Map();

server.on("connection", (socket) => {
  const id = genereateUniqueId();
  console.log(`Client ${id} is connected`);
  clients.set(socket, id);

  socket.on("message", (message) => {
    const id = clients.get(socket); // Retrieve the client ID from the map
    console.log(`message received from client ${id} ${message}`);
    broadcastMessage(message, id);
  });

  socket.on("close", () => {
    console.log(`Client ${id} disconnected!!`);
    clients.delete(id);
  });
});

function genereateUniqueId() {
  return Math.random().toString(36).substring(2, 9);
}

function broadcastMessage(message, senderId) {
  for (const [client, id] of clients) {
    if (client.readyState === webSocket.OPEN && id !== senderId) {
      client.send(`Client ${senderId} : ${message}`);
    }
  }
}

console.log("Websocket server is running on ws://localhost:8080");
