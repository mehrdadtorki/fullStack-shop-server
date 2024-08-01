const db = require('../../database/mySQL');

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
      const { name, quantityInStock, unitPrice } = productData;

      if (
        name === undefined ||
        quantityInStock === undefined ||
        unitPrice === undefined
      ) {
        throw new Error('Missing required product data');
      } else {
        const newProduct = db.execute(
          'INSERT INTO products (name, quantity_in_stock, unit_price) VALUES (?, ?, ?)',
          [name, quantityInStock, unitPrice]
        );
        return newProduct;
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async updateProduct(productId, updatedValue) {
    const { name, quantityInStock, unitPrice } = updatedValue;
    try {
      if (
        productId === undefined ||
        name === undefined ||
        quantityInStock === undefined ||
        unitPrice === undefined
      ) {
        throw new Error('Missing required product data');
      } else {
        const updatedProduct = db.execute(
          'UPDATE products SET name = ?, quantity_in_stock = ?, unit_price = ? WHERE product_id = ?',
          [name, quantityInStock, unitPrice, productId]
        );
        return updatedProduct;
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteProduct(selectedProductId) {
    try {
      const deleteProduct = db.execute(
        'DELETE FROM products WHERE product_id = ?;',
        [selectedProductId]
      );
      return deleteProduct;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Product;
