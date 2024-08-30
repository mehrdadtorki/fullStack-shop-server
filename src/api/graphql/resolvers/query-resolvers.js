const { ProductService } = require('../../../app/services/ProductService');
const { OrderService } = require('../../../app/services/OrderService');
const { CustomerService } = require('../../../app/services/CustomerService');

const resolvers = {
  Query: {
    // Products Queries
    getAllProducts: async () => {
      try {
        return await ProductService.getAllProducts();
      } catch (error) {
        console.error('error in getAllProducts resolver:', error);
      }
    },
    getSingleProduct: async (_, { id }) => {
      try {
        return await ProductService.getSingleProduct(id);
      } catch (error) {
        console.error('error in getSingleProduct resolver:', error);
      }
    },
    // Orders Queries
    getAllOrders: async () => {
      try {
        return await OrderService.getAllOrders();
      } catch (error) {
        console.error('error in getAllOrders resolver Query', error);
      }
    },
    getCustomerOrders: async (_, { id }) => {
      try {
        return await OrderService.getCustomerOrders(id)
      } catch (error) {
        console.error('error in getCustomerOrders Query', error)
      }
    },
    // Customers Queries
    getAllCustomers: async () => {
      try {
        return await CustomerService.getAllCustomers();
      } catch (error) {
        console.error('error in getAllCustomers Queries', error);
      }
    },
    getCustomer: async (_, { id }) => {
      try {
        return await CustomerService.getCustomer(id)
      } catch (error) {
        console.error('error in getCustomer Query', error)
      }
    }
  },
};

module.exports = resolvers;
