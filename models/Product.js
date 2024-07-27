const db = require('../database/mySQL');

class Product {
  static async getProducts() {
    try {
      const [rows] = await db.execute('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.error('error in getProducts product model', error);
    }
  }
  static async getProduct(id) {
    try {
      const [
        rows,
        fields,
      ] = await db.execute('SELECT * FROM products WHERE product_id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('error in getProduct product model', error);
    }
  }
  static async addProduct(productData) {
    try {
      const { name, quantity, unitPrice } = productData;
      const newProduct = db.execute(
        'INSERT INTO products (name, quantity_in_stock, unit_price) VALUES (?, ?, ?)',
        [name, quantity, unitPrice]
      );
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Product;
