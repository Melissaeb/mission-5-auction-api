const express = require("express");
const { searchItems } = require("../controllers/auctionController");

const router = express.Router();

router.get("/search", searchItems);

module.exports = router;
