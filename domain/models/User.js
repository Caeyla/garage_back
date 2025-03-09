class User {
    constructor(id,name,firstName,email,password,isActive) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.firstName = firstName;
        this.password = password;
        this.type = type;
        this.isActive = isActive;
        
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.firstName = "";
                this.email = "";
                this.password = "";
                this.isActive = false;
            }
    
            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setFirstName(firstName) { this.firstName = firstName; return this; }
            setEmail(email) { this.email = email; return this; }
            setPassword(password) { this.password = password; return this; }
            setIsActive(isActive) { this.isActive = isActive; return this; }
    
            build() {
                return new User(
                    this.id,
                    this.name,
                    this.firstName,
                    this.email,
                    this.password,
                    this.isActive
                );
            }
        }
        return Builder;
    }

}

module.exports = User;