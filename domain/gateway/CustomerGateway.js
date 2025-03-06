class CustomerGateway {
    constructor() {
        if (this.constructor === CustomerGateway) {
            throw new Error("Cannot instantiate an interface.");
        }
    }

    addCustomer(customer) {
        throw new Error("Method 'addCustomer()' must be implemented.");
    }

    getCustomerById(customerId) {
        throw new Error("Method 'getCustomerById()' must be implemented.");
    }

    updateCustomer(customer) {
        throw new Error("Method 'updateCustomer()' must be implemented.");
    }

    deleteCustomer(customerId) {
        throw new Error("Method 'deleteCustomer()' must be implemented.");
    }
}

module.exports = CustomerGateway;