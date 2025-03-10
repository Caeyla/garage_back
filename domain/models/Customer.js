const User = require('./User');

class Customer extends User {
    constructor(id, name, firstName, email, password, isActive, phone) {
        super(id, name, firstName, email, password, isActive);
        this.phone = phone;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.firstName = "";
                this.email = "";
                this.password = "";
                this.isActive = true;
                this.phone = "";
            }

            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setFirstName(firstName) { this.firstName = firstName; return this; }
            setEmail(email) { this.email = email; return this; }
            setPassword(password) { this.password = password; return this; }
            setIsActive(isActive) { this.isActive = isActive; return this; }
            setPhone(phone) { this.phone = phone; return this; }

            build() {
                return new Customer(
                    this.id,
                    this.name,
                    this.firstName,
                    this.email,
                    this.password,
                    this.isActive,
                    this.phone
                );
            }
        }
        return Builder;
    }

}

module.exports = Customer;