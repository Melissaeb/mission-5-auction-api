const mongoose = require("mongoose");

// Define a new schema for auction items using mongoose.Schema.
// A schema defines the structure of the documents within a collection.
const auctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_price: { type: Number, required: true },
  reserve_price: { type: Number, required: true },
});

// Create a model named 'AuctionItem' using the auctionItemSchema.
// A model is a class that constructs documents from a schema and interacts with the database.
const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

module.exports = AuctionItem;
