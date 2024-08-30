// src/infrastructure/repositories/ProductRepository.js
const IProductRepository = require('../../../domain/repositories/IProductRepository');
const db = require('../database/mySQL');

class OrderRepository extends IProductRepository {
  static async getAllOrders() {
    try {
      const [rows] = await db.execute('SELECT * FROM orders');
      return rows;
    } catch (error) {
      console.error('Error in getAllOrders OrderRepository', error);
      throw error;
    }
  }
  static async getCustomerOrders(id) {
    if (!id) {
      throw new Error('customer id has not been provided');
    } else {
      try {
        const [rows] = await db.execute(
          `SELECT 
             o.order_id, 
             o.customer_id, 
             o.product_id, 
             o.order_date, 
             o.quantity 
           FROM orders o 
           JOIN customers c ON o.customer_id = c.customer_id 
           WHERE o.customer_id = ?`,
          [id]
        );
        return rows;
      } catch (error) {
        console.error('error in getCustomerOrders Orders repository', error);
      }
    }
  }
}

module.exports = { OrderRepository };
