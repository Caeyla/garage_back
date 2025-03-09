const Customer = require("../../domain/models/Customer");

function convertSchemaToModel(customerSchema) {
  return new Customer.Builder()
    .setName(customerSchema.name)
    .setFirstname(customerSchema.firstname)
    .setEmail(customerSchema.email)
    .setPassword(customerSchema.password)
    .setIsActive(customerSchema.isActive)
    .setPhone(customerSchema.phone)
    .build();

}

function convertModelToSchema(customer) {
    return {
        name: customer.name,
        firstname: customer.firstname,
        email: customer.email,
        password: customer.password,
        isActive: customer.isActive,
        phone: customer.phone
    };
}