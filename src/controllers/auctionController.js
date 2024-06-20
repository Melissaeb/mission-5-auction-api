const AuctionItem = require("../models/AuctionItem");

const searchItems = async (req, res) => {
  const { query } = req.query;

  try {
    // Use the AuctionItem model to search the database for items where either the title or description matches the 'query' string. The '$regex' operator is used for pattern matching, and '$options: "i"' makes the search case-insensitive.
    const items = await AuctionItem.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json(items);
  } catch (error) {
    console.error("Error searching items", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchItems };
