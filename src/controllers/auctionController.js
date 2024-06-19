const AuctionItem = require("../models/AuctionItem");

const searchItems = async (req, res) => {
  const { query } = req.query;

  try {
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
// const { getAIPredictions } = require("../services/aiService");

// const searchItems = async (req, res) => {
//   const { query } = req.query;

//   try {
//     const aiResponse = await getAIPredictions(query);
//     const aiKeywords = aiResponse.keywords;

//     const items = await AuctionItem.find({
//       $or: [
//         { title: { $regex: aiKeywords.join("|"), $options: "i" } },
//         { description: { $regex: aiKeywords.join("|"), $options: "i" } },
//       ],
//     });

//     res.json(items);
//   } catch (error) {
//     console.error("Error searching items", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = { searchItems };
