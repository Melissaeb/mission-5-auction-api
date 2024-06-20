const mongoose = require("mongoose");
// This is an in-memory MongoDB server for running tests without a real MongoDB server.
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// The 'beforeAll' function runs once before all tests in this file.
// Set up the in-memory MongoDB server and connects Mongoose to it.
beforeAll(async () => {
  // Create a new instance of the in-memory MongoDB server.
  mongoServer = await MongoMemoryServer.create();
  // Get the URI (connection string) of the in-memory MongoDB server.
  const uri = mongoServer.getUri();

  // Connect Mongoose to the in-memory MongoDB server using the obtained URI.
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
