const UserCreateUseCase = require("../../../domain/usecases/user/UserCreateUseCase");
const CustomerAdapter = require("../../../adapters/CustomerAdapter");
const EmployeeAdapter = require("../../../adapters/EmployeeAdapter");
const UserType = require("../../../domain/enumeration/UserType");
const bcrypt = require("bcrypt");
const SecurityConstant = require("../../../constant/SecurityConstant");
const SALT_ROUNDS = SecurityConstant.SALT_ROUNDS;

describe("common user create use case tests ", () => {
    let customerAdapter;
    let employeeAdapter;
    let createUserUseCase;

    beforeEach(() => {
        customerAdapter = new CustomerAdapter();
        employeeAdapter = new EmployeeAdapter();
        createUserUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should hash password before creating user", async () => {
        const password = "password";
        const hashSpy = jest.spyOn(bcrypt, "hashSync");
        const createUserUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
        jest.spyOn(createUserUseCase, "handleCreateCustomer").mockImplementation(() => Promise.resolve());
        await createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "0aK9w@example.com",
            password: password,
            userType: UserType.CUSTOMER,
            extraData: {
                phone: "1234567890"
            },        
        });
        expect(hashSpy).toHaveBeenCalledWith(password, SALT_ROUNDS);
    });

    it("it should throw error if user type does not exist", async () => {
        await expect(createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "0aK9w@example.com",
            password: "password",
            userType: "invalid",
            extraData: {
                phone: "1234567890",
            },        
        })).rejects.toThrow(new Error("User type invalid does not exist"));
    });

    it("should throw error if email is not valid", async () => {
        await expect(createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "invalid-email.com",
            password: "password",
            userType: UserType.CUSTOMER,
            extraData: {
                phone: "1234567890",
            },        
        })).rejects.toThrow(new Error("Email invalid-email.com is not valid"));
    })

    it("should throw error if required fields are not present", async () => {
        await expect(createUserUseCase.create({
            name: "John",
            firstName: undefined,
            email: null,
            password: "password",
            userType: UserType.CUSTOMER,
            extraData: {
                phone: null
            }
        })).rejects.toThrow(new Error("firstname, email, phone"));
    })
})

describe("Employee create use case tests ", () => {
    let customerAdapter;
    let employeeAdapter;
    let createUserUseCase;
    const employeeId = "2385Gd";

    beforeEach(() => {
        customerAdapter = new CustomerAdapter();
        employeeAdapter = new EmployeeAdapter();
        createUserUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
        jest.spyOn(employeeAdapter, "create").mockReturnValue(Promise.resolve({ id: employeeId }));
        jest.spyOn(createUserUseCase, "handleCreateCustomer").mockReturnValue(new Error("error this method should not be called here"));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create manager", async () => {
        const result = await createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "0aK9w@example.com",
            password: "password",
            userType: UserType.MANAGER,
            extraData: {
                income: 1000,
                unavailableDates: ["2023-01-01", "2023-01-02"],
            },
        });
        expect(result).toEqual({id: employeeId});
    });

    it("should create mechanic", async () => {
        const result = await createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "0aK9w@example.com",
            password: "password",
            userType: UserType.MECHANIC,
            extraData: {
                income: 1000,
                unavailableDates: ["2023-01-01", "2023-01-02"],
            },
        });
        expect(result).toEqual({id: employeeId});
    })
});

describe("customer create use case tests ", () => {
    let customerAdapter;
    let employeeAdapter;
    let createUserUseCase;
    const customerId = "2384Gd";

    beforeEach(() => {
        customerAdapter = new CustomerAdapter();
        jest.spyOn(customerAdapter, "create").mockReturnValue(Promise.resolve({ id: customerId }));
        createUserUseCase = new UserCreateUseCase(customerAdapter, employeeAdapter);
        jest.spyOn(createUserUseCase, "handleCreateEmployee").mockReturnValue(new Error("error this method should not be called here"));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create customer", async () => {
        const result = await createUserUseCase.create({
            name: "John",
            firstName: "Doe",
            email: "0aK9w@example.com",
            password: "password",
            userType: UserType.CUSTOMER,
            extraData: {
                phone: "1234567890",
            },
        });
        expect(result).toEqual({id: customerId});
    });

});