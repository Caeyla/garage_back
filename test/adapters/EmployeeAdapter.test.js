const EmployeeAdapter = require("../../adapters/EmployeeAdapter");
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

describe("employee adapter tests", () => {
  let employeeAdapter;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    employeeAdapter = new EmployeeAdapter();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should create mechanic", async () => {
    const result = await employeeAdapter.create({
      name: "John",
      firstName: "Doe",
      email: "0aK9w@example.com",
      password: "password",
      birthDate: "1990-01-01",
      income: 1000,
      type: "MECHANIC",
      unavailableDates: ["2023-01-01", "2023-01-02"]
    });
    expect(result.id).toBeInstanceOf(ObjectId);
  });

  it("should find user employee by email", async () => {
    const email = "employeToFind@example.com";
    await employeeAdapter.create({
      name: "John",
      firstName: "Doe",
      email: email,
      password: "password",
      birthDate: "1990-01-01",
      income: "1234567890",
      type: "MECHANIC",
      unavailableDates: ["2023-01-01", "2023-01-02"]
    });

    const result = await employeeAdapter.findByEmail(email);
    expect(result.email).toBe(email);
  });

  it("should  return null if user customer not found", async () => {
    const email = "notfound@example.com";
    const result = await employeeAdapter.findByEmail(email);
    expect(result).toBeNull();
  })
});