const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://fardindev:OQQXVTimjmG6LspR@cluster0.tkbjee1.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Create a schema for ticket prices
const ticketPriceSchema = new mongoose.Schema({
  ticketId: String,
  price: String,
});

// Create a TicketPrice model based on the schema
const TicketPrice = mongoose.model("TicketPrice", ticketPriceSchema);

// GET endpoint to retrieve all ticket prices
app.get("/ticketPrice", async (req, res) => {
  const ticketPrices = await TicketPrice.find();
  res.send(ticketPrices);
});

// POST endpoint to add a new ticket price
app.post("/ticketPrice", async (req, res) => {
  const ticketPrice = new TicketPrice({
    ticketType: req.body.ticketType,
    price: req.body.price,
  });

  try {
    await ticketPrice.save();
    res.send("Ticket price saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving ticket price");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
