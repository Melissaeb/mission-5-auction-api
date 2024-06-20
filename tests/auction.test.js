const request = require("supertest");
const app = require("../src/app");
const AuctionItem = require("../src/models/AuctionItem");

// Run this function before each test in this file.
beforeEach(async () => {
  // Clear all auction items from the database to ensure a clean state for each test.
  await AuctionItem.deleteMany();

  await AuctionItem.create([
    {
      title: "Antique Vase",
      description: "A beautiful antique vase from the 19th century.",
      start_price: 100,
      reserve_price: 200,
    },
    {
      title: "Vintage Car",
      description: "A fully restored vintage car from the 1950s.",
      start_price: 5000,
      reserve_price: 10000,
    },
    {
      title: "Old Master Painting",
      description: "A painting by an old master, very valuable.",
      start_price: 20000,
      reserve_price: 50000,
    },
  ]);
});

describe("GET /", () => {
  it("should return API is running...", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.text).toBe("API is running...");
  });
});

describe("GET /api/auctions/search", () => {
  it("should return items that match the search query", async () => {
    // Make a GET request to the search endpoint with a query string and expect a 200 OK response.
    const response = await request(app)
      .get("/api/auctions/search")
      .query({ query: "antique" })
      .expect(200);

    // Assert that the response body contains exactly one item.
    expect(response.body.length).toBe(1);
    // Assert that the title of the returned item matches the expected title.
    expect(response.body[0].title).toBe("Antique Vase");
  });

  it("should return an empty array if no items match the search query", async () => {
    // Make a GET request to the search endpoint with a query string that does not match any items and expect a 200 OK response.
    const response = await request(app)
      .get("/api/auctions/search")
      .query({ query: "modern art" })
      .expect(200);

    // Assert that the response body contains no items.
    expect(response.body.length).toBe(0);
  });
});
