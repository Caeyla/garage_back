const CustomerAdapter = require("../../../adapters/CustomerAdapter");
const EmployeeAdapter = require("../../../adapters/EmployeeAdapter");
const UserLoginUseCase = require("../../../domain/usecases/user/UserLoginUseCase");
const SecurityConstant = require("../../../constant/SecurityConstant");
const bcrypt = require("bcrypt");
const UserType = require("../../../domain/enumeration/UserType");


describe("user login use case tests ", () => {
    let customerAdapter;
    let employeeAdapter;
    let userLoginUseCase;
    const email = "0aK9w@example.com";
    const password = "password";
    const cryptedPassword = bcrypt.hashSync(password, SecurityConstant.SALT_ROUNDS);

    beforeEach(() => {
        customerAdapter = new CustomerAdapter();
        employeeAdapter = new EmployeeAdapter();
        userLoginUseCase = new UserLoginUseCase(customerAdapter, employeeAdapter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should login customer user", async () => {
        const spyOnCustomerAdapter = jest.spyOn(customerAdapter, "findByEmail").mockReturnValue({
            email: email,
            password: cryptedPassword
        });
        const spyOnEmployeeAdapter = jest.spyOn(employeeAdapter, "findByEmail").mockReturnValue(null);
        
        const result = await userLoginUseCase.login(email, password);
        expect(spyOnCustomerAdapter).toHaveBeenCalledWith(email);
        expect(result.jwt).toBeDefined();
        expect(result.role).toBe(UserType.CUSTOMER);
    });

    it("should login employee user", async () => {
        const spyOnCustomerAdapter = jest.spyOn(customerAdapter, "findByEmail").mockReturnValue(null);
        const spyOnEmployeeAdapter = jest.spyOn(employeeAdapter, "findByEmail").mockReturnValue({
            email: email,
            password: cryptedPassword,
            type: UserType.MECHANIC
        });
        
        const result = await userLoginUseCase.login(email, password);
        expect(spyOnCustomerAdapter).toHaveBeenCalledWith(email);
        expect(result.jwt).toBeDefined();
        expect(result.role).toBe(UserType.MECHANIC);
    });

    it("should throw error for wrong login",async () => {
        const spyOnCustomerAdapter = jest.spyOn(customerAdapter, "findByEmail").mockReturnValue(null);
        const spyOnEmployeeAdapter = jest.spyOn(employeeAdapter, "findByEmail").mockReturnValue(null);
        await expect(userLoginUseCase.login(email, password)).rejects.toThrow(new Error("Invalid email or password"));
    })

});