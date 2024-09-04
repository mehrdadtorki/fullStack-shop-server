const { ProductService } = require('../../../app/services/ProductService');
const { OrderService } = require('../../../app/services/OrderService');
const { CustomerService } = require('../../../app/services/CustomerService');
const { AuthenticationError } = require('apollo-server-express'); // Import AuthenticationError

const resolvers = {
  Query: {
    // Public Queries
    getAllProducts: async () => {
      // Anyone can access this query
      try {
        return await ProductService.getAllProducts();
      } catch (error) {
        console.error('error in getAllProducts resolver:', error);
      }
    },
    getSingleProduct: async (_, { id }) => {
      // Anyone can access this query
      try {
        return await ProductService.getSingleProduct(id);
      } catch (error) {
        console.error('error in getSingleProduct resolver:', error);
      }
    },

    // Protected Queries - Require Authentication
    getAllOrders: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view orders.');
      }
      try {
        return await OrderService.getAllOrders();
      } catch (error) {
        console.error('error in getAllOrders resolver Query', error);
      }
    },
    getCustomerOrders: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view customer orders.');
      }
      try {
        return await OrderService.getCustomerOrders(id);
      } catch (error) {
        console.error('error in getCustomerOrders Query', error);
      }
    },
    getAllCustomers: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view customers.');
      }
      try {
        return await CustomerService.getAllCustomers();
      } catch (error) {
        console.error('error in getAllCustomers Queries', error);
      }
    },
    getCustomer: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view this customer.');
      }
      try {
        return await CustomerService.getCustomer(id);
      } catch (error) {
        console.error('error in getCustomer Query', error);
      }
    },
  },
};

module.exports = resolvers;
