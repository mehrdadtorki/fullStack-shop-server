const { ProductRepository } = require('../../infrastructure/persistence/repositories/OrderRepository.js');

class ProductService {
  static async getAllProducts() {
    return await ProductRepository.getAllProducts();
  }
  static async getSingleProduct(id) {
    return await ProductRepository.getSingleProduct(id)
  }
  static async addProduct (productItem) {
    return await ProductRepository.addProduct(productItem)
  }
  static async updateProduct(productItem) {
    return await ProductRepository.updateProduct(productItem)
  }
  static async deleteProduct (id) {
    return await ProductRepository.deleteProduct(id)
  }
}

module.exports = { ProductService };
