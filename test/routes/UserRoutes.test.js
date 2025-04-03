const request = require('supertest');
const appTest = require('../appTest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CustomerAdapter = require('../../adapters/CustomerAdapter');
const EmployeeAdapter = require('../../adapters/EmployeeAdapter');
const UserCreateUseCase = require('../../domain/usecases/user/UserCreateUseCase');
const UserType = require('../../domain/enumeration/UserType');
const UserRequestDto = require('../../dto/user/UserRequestDto');
const PrestationAdapter = require('../../adapters/PrestationAdapter');


let mongoServer;
let server;

beforeAll(async () => {
    server = appTest.listen(5000, () => {
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

describe("Registration ", () => {
    it("Should register user customer", async () => {
        const response = await request(appTest)
            .post('/user/register')
            .send({
                lastname: "John",
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

    // it('Should register user mechanic', async () => {
    //     const response = await request(appTest)
    //         .post('/user/register')
    //         .send({
    //             lastname: "John",
    //             firstname: "Doe",
    //             email: "0aK9w@example.com",
    //             password: "password",
    //             userType: "MECHANIC",
    //             extraData: {
    //                 income: 1000,
    //                 unavailableDates: ["2023-01-01", "2023-01-02"]
    //             }
    //         });
    //     console.log(response.body);
    //     expect(response.status).toBe(201);
    //     expect(response.body.id).toBeDefined();
    // });

});

describe("Login", () => {
    const password = "password";
    const userCreateUseCase = new UserCreateUseCase(
        new CustomerAdapter(),
        new EmployeeAdapter(),
        new PrestationAdapter()
    );

    it("Should login user customer", async () => {
        const emailCutsomer = "customer@example.com";
        await userCreateUseCase.create(
            new UserRequestDto({
                lastname: "John",
                firstname: "Doe",
                email: emailCutsomer,
                password: password,
                userType: UserType.CUSTOMER,
                extraData: {
                    phone: "1234567890",
                }
            })
        );
        const response = await request(appTest)
            .post('/user/login')
            .send({
                email: emailCutsomer,
                password: password
            });
        expect(response.status).toBe(200);
        expect(response.body.jwt).toBeDefined();
        expect(response.body.role).toBe(UserType.CUSTOMER);
    });

    // it("Should login user employee", async () => {
    //     const email = "employee@example.com";
    //     await userCreateUseCase.create(
    //         new UserRequestDto({
    //             lastname: "John",
    //             firstname: "Doe",
    //             email: email,
    //             password: "password",
    //             userType: UserType.MECHANIC,
    //             extraData: {
    //                 income: 1000,
    //                 unavailableDates: ["2023-01-01", "2023-01-02"]
    //             }
    //         })
    //     );
    //     const response = await request(appTest)
    //         .post('/user/login')
    //         .send({
    //             email: email,
    //             password: password
    //         });
    //     expect(response.status).toBe(200);
    //     expect(response.body.jwt).toBeDefined();
    //     expect(response.body.role).toBe(UserType.MECHANIC);
    // })
});