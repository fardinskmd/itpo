const express = require("express");
const app = express();

// Define a route to handle the payment gateway response
app.get("/thankuPage", async (req, res) => {
  const responseCode = req.query.Response_Code;

  try {
    // Make an asynchronous operation here
    const result = await someAsyncOperation();

    // Check if the payment was successful
    if (responseCode === "E000") {
      // Display a success page
      res.send("<h1>Payment Successful!</h1>");
    } else {
      // Display an error page
      res.send("<h1>Payment Failed!</h1>");
    }
  } catch (error) {
    // Handle the error
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
