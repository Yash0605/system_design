const app = require("express")();

app.get("/", (request, response) => {
  response.send("Hello the server is working!!");
});

app.get("/stream", (request, response) => {
  response.setHeader("Content-Type", "text/event-stream");

  send(response);

  //   response.write("data: " + "hello!!\n\n");
});

let i = 0;
function send(response) {
  setInterval(() => {
    response.write(`data: hello${i++}\n\n`);
  }, 5000);
}

app.listen(8080);
console.log("Server is listening at port 8080");
