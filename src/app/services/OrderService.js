const {
  OrderRepository,
} = require('../../infrastructure/persistence/repositories/OrderRepository.js');

class OrderService {
  static async getAllOrders() {
    return await OrderRepository.getAllOrders();
  }
  static async getCustomerOrders(id) {
    return await OrderRepository.getCustomerOrders(id);
  }
}

module.exports = { OrderService };
