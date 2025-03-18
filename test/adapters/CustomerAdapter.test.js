const CustomerAdapter = require("../../adapters/CustomerAdapter");
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

describe("customer adapter tests", () => {
  let customerAdapter;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    customerAdapter = new CustomerAdapter();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should create customer", async () => {
    const result = await customerAdapter.create({
      name: "John",
      firstName: "Doe",
      email: "0aK9w@example.com",
      password: "password",
      birthDate: "1990-01-01",
      phone: "1234567890"
    });

    console.log(result);
    expect(result._id).toBeInstanceOf(ObjectId);
  });

  it("should find user customer by email", async () => {
    const email = "customerToFind@example.com";
    await customerAdapter.create({
      name: "John",
      firstName: "Doe",
      email: email,
      password: "password",
      birthDate: "1990-01-01",
      phone: "1234567890"
    });

    const result = await customerAdapter.findByEmail(email);
    expect(result.email).toBe(email);
  });

  it("should  return null if user customer not found", async () => {
    const email = "notfound@example.com";
    const result = await customerAdapter.findByEmail(email);
    expect(result).toBeNull();
  })

});