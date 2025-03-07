class Customer {
    constructor(id,userId, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
    }

    sayHello() {
        return `Hello, ${this.name}!`;
    }

}

module.exports = Customer;