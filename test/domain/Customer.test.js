const Customer = require("../../domain/models/Customer");

test('should say hello', () => {
  const customer = new Customer(1, 1, 'John Doe', '', '');
  expect(customer.sayHello()).toBe('Hello, John Doe!');
});