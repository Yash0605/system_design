const WebSocket = require("ws");
const readline = require("readline");

const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
  console.log("Client connected to the server!!");
  //   need an interface to send the message for broadcasting to other clients
  promptMessage();
});

socket.on("message", (message) => {
  console.log(`\n Received the message ${message}`);
  //   socket.close();
});

socket.on("close", () => {
  console.log("Client disconnected from server");
});

function promptMessage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the message : ", (message) => {
    socket.send(message);
    rl.close();
    promptMessage();
  });
}
