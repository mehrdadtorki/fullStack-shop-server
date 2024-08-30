const { ProductService } = require('../../../app/services/ProductService');

const resolvers = {
  Mutation: {
    addProduct: async (_, { productItem }) => {
      try {
        return await ProductService.addProduct(productItem);
      } catch (error) {
        console.error('error in addProduct mutation resolver:', error);
      }
    },
    updateProduct: async (_, { productItem }) => {
      try {
        return await ProductService.updateProduct(productItem);
      } catch (error) {
        console.error('error in update product mutation resolver', error);
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        return await ProductService.deleteProduct(id);
      } catch (error) {
        console.error('error in delete product mutation resolver', error);
      }
    },
  },
};

module.exports = resolvers;
