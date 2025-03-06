class UserGateway {
    constructor() {
        if (this.constructor === UserGateway) {
            throw new Error("Cannot instantiate an interface");
        }
    }

    createUser(user) {
        throw new Error("Method 'createUser()' must be implemented.");
    }

    getUserById(userId) {
        throw new Error("Method 'getUserById()' must be implemented.");
    }

    updateUser(userId, user) {
        throw new Error("Method 'updateUser()' must be implemented.");
    }

    deleteUser(userId) {
        throw new Error("Method 'deleteUser()' must be implemented.");
    }
}

module.exports = UserGateway;