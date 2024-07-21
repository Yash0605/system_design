let inputValue;
const fetchVal = async function () {
  const progressVal = document.getElementById("status");
  const isComplete = document.getElementById("completed");
  inputValue = !inputValue ? document.getElementById("getValue") : inputValue;

  val = await fetch("http://localhost:1515/poll", {
    method: "POST", // Specify the request method as POST
    headers: {
      "Content-Type": "application/json", // Set the request headers
    },
    body: JSON.stringify({
      value: inputValue.value,
    }), // Convert the JavaScript object to a JSON string
  })
    .then((response) => response.json()) // Parse the JSON from the response
    .then((val) => {
      console.log("Success:", val); // Handle the response data
      progressVal.textContent = val.status != "Waiting" ? val.data : val.status;
      if (val.data == parseInt(inputValue.value)) {
        isComplete.innerText = val.status;
        fetchVal();
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });
};
