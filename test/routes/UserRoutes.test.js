const request = require('supertest');
const appTest = require('../appTest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer;
let server;

beforeAll(async () => {
    server = await appTest.listen(5000, () => {
        console.log(`Server is running on port 5000 `);
    });
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();  
    await mongoose.connect(mongoUri, {});
});

afterAll(async () => {
    await mongoose.disconnect();  // Déconnecte Mongoose
    await mongoServer.stop();  // Arrête le serveur MongoDB en mémoire
    server.close();
});

describe("Customer registration ", () => {
    it("Should register user customer", async () => {
        const response = await request(appTest)
            .post('/user/register')
            .send({
                name: "John",
                firstname: "Doe",
                email: "0aK1w@example.com",
                password: "password",
                userType: "CUSTOMER",
                extraData: {
                    phone: "1234567890",
                }
            });
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
    });


});

describe("Mechanic registration", () => {
    it('Should register user mechanic',async () => {
        const response = await request(appTest)
            .post('/user/register')
            .send({
                name: "John",
                firstname: "Doe",
                email: "0aK9w@example.com",
                password: "password",
                userType: "MECHANIC",
                extraData: {
                    income: 1000,
                    unavailableDates: ["2023-01-01", "2023-01-02"]
                }
            });
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
    });
});