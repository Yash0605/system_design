const express = require("express");
const app = express();
const port = 1515;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

let vals = [];

const populateVals = function (requiredVal) {
  if (vals.length == 0 || !vals.includes(parseInt(requiredVal))) {
    setInterval(() => {
      const len = vals.length;
      if (len == 0) {
        vals.push(5);
      } else {
        // get the length and append new val accordingly
        if (!vals.includes(parseInt(requiredVal))) {
          vals.push(5 * (len + 1));
        }
      }
    }, 5000);
  }
};

// Endpoint to get messages (polled by the client)
app.post("/poll", (req, res) => {
  const requiredVal = req.body.value;
  populateVals(requiredVal);
  if (vals.length != 0) {
    if (vals.includes(parseInt(requiredVal))) {
      res.json({ data: "Value Found", status: "Completed" });
    } else {
      res.json({ data: vals[vals.length - 1], status: "In Progress" });
    }
  } else {
    res.json({ data: -1, status: "Waiting" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
