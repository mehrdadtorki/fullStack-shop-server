const ICustomerRepository = require('../../../domain/repositories/ICustomerRepository');
const db = require('../database/mySQL');

class CustomerRepository extends ICustomerRepository {
  static async getAllCustomers() {
    try {
      const [rows] = await db.execute('SELECT * FROM customers');
      return rows;
    } catch (error) {
      console.error('error in getAllCustomers Customer Repository');
    }
  }
  static async getCustomer(id) {
    if (!id) {
      throw new Error('is must be provided');
    } else {
      try {
        const [rows] = await db.execute(
          'SELECT * FROM customers WHERE customer_id = ?',
          [id]
        );
        return rows[0];
      } catch (error) {
        console.error('error in getCustomer repository', error);
      }
    }
  }
}

module.exports = CustomerRepository;
