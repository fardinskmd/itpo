const mongoose = require("mongoose");

// Define schema for the ticket document
const ticketSchema = new mongoose.Schema(
  {
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      required: true,
    },
    tickettype: {
      type: String,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Ticket model based on the ticket schema
const Ticket = mongoose.model("Ticket", ticketSchema);

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://fardindev:OQQXVTimjmG6LspR@cluster0.tkbjee1.mongodb.net/tickets",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");

    // Create a new ticket document
    const ticket = new Ticket({
      startdate: "25/02/2023",
      enddate: "05/03/2023",
      tickettype: "Child",
      validity: "9 days",
    });

    // Save the ticket document to the database
    ticket
      .save()
      .then((savedTicket) => {
        console.log("Ticket saved to database:", savedTicket);
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error saving ticket to database:", error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
