const CustomerRepository = require('../../infrastructure/persistence/repositories/CustomerRepository.js');

class CustomerService {
  static async getAllCustomers() {
    return await CustomerRepository.getAllCustomers();
  }
  static async getCustomer(id) {
    return await CustomerRepository.getCustomer(id)
  }
}

module.exports = { CustomerService };
