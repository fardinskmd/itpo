const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mongoose Connection
mongoose
  .connect(
    "mongodb+srv://fardindev:OQQXVTimjmG6LspR@cluster0.tkbjee1.mongodb.net/tickets",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Price Schema
const priceSchema = new mongoose.Schema(
  {
    ticketid: String,
    citizentype: String,
    price: Number,
  },
  { timestamps: true }
);

const Price = mongoose.model("Price", priceSchema);

// GET request
app.get("/getpricebyid/:id", async (req, res) => {
  try {
    const price = await Price.findOne({ ticketid: req.params.id });
    if (!price) {
      return res.status(404).json({ error: "Price not found" });
    }
    res.json(price);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST request
app.post("/addprice", async (req, res) => {
  try {
    const { ticketid, citizentype, price } = req.body;
    const newPrice = new Price({
      ticketid,
      citizentype,
      price,
    });
    await newPrice.save();
    res.status(200).json({ message: "Price saved successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
