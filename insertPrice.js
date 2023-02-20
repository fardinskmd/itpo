const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://fardindev:OQQXVTimjmG6LspR@cluster0.tkbjee1.mongodb.net/tickets";

// Database and collection names
const dbName = "mydb";
const collectionName = "mycollection";

// Data to be inserted
const data = {
  citizentype: "Adult",
  createdAt: new Date(),
  date: "17-11-2022",
  price: "20",
  ticketid: "63f344e26b967ad9ab9a7c9c",
  updatedAt: new Date(),
};

// Connect to the database
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  }

  // Get the collection
  const collection = client.db(dbName).collection(collectionName);

  // Insert the document
  collection.insertOne(data, (err, result) => {
    if (err) {
      console.error("Failed to insert document:", err);
    } else {
      console.log("Document inserted:", result.insertedId);
    }

    // Close the connection
    client.close();
  });
});
