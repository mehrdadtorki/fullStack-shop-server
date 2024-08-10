const db = require('../infrastructure/database/mySQL');
const ProductRepository = require('../infrastructure/repositories/ProductRepository');

class Product {
  static async getProducts() {
    try {
      const rows = await ProductRepository.getProducts();
      return rows;
    } catch (error) {
      console.error('error in getProducts product model', error);
    }
  }
  static async getProduct(id) {
    try {
      const product = await ProductRepository.getProduct(id);
      return product;
    } catch (error) {
      console.error('error in getProduct product model', error);
    }
  }
  static async addProduct(productData) {
    try {
      const result = await ProductRepository.addProduct(productData);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateProduct(productId, updatedValue) {
    try {
      const result = await ProductRepository.updateProduct(
        productId,
        updatedValue
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteProduct(selectedProductId) {
    try {
      const deleteProduct = await ProductRepository.deleteProduct(
        selectedProductId
      );
      return deleteProduct;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Product;
