const request = require("supertest");
const app = require("../src/app");
const AuctionItem = require("../src/models/AuctionItem");

beforeEach(async () => {
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
    const response = await request(app)
      .get("/api/auctions/search")
      .query({ query: "antique" })
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Antique Vase");
  });

  it("should return an empty array if no items match the search query", async () => {
    const response = await request(app)
      .get("/api/auctions/search")
      .query({ query: "modern art" })
      .expect(200);

    expect(response.body.length).toBe(0);
  });
});
