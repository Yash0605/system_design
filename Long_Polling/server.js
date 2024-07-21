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
let setIntevalVar = null;
let final = null;
let requiredVal;

const populateVals = function () {
  if (vals.length == 0 || !vals.includes(parseInt(requiredVal))) {
    let popInterval = setInterval(() => {
      console.log(`Here: ${vals}`);
      const len = vals.length;
      if (len == 0) {
        vals.push(5);
      } else {
        // get the length and append new val accordingly
        if (!vals.includes(parseInt(requiredVal))) {
          vals.push(5 * (len + 1));
        } else {
          clearInterval(popInterval);
        }
      }
    }, 5000);
  }
};

let getVals = () => {
  if (vals.includes(parseInt(requiredVal))) {
    final = { data: "Value Found", status: "Completed" };
    clearInterval(setIntevalVar);
  }
};

// Endpoint to get messages (polled by the client)
app.post("/poll", (req, res) => {
  requiredVal = req.body.value;
  populateVals();

  setIntevalVar = setInterval(() => {
    if (
      vals.includes(parseInt(requiredVal)) ||
      vals[vals.length - 1] > parseInt(requiredVal)
    ) {
      res.json({ data: "Value Found", status: "Completed" });
      clearInterval(setIntevalVar);
    }
  }, 6000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
