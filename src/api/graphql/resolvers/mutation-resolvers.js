const { ProductService } = require('../../../app/services/ProductService');
const { AuthenticationService } = require('../../../app/services/AuthenticationService');

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
    userSignUp: async (_, { userSignUpItem }) => {
      try {
        return await AuthenticationService.userSignUp(userSignUpItem);
      } catch (error) {
        console.error('error in userSignUp mutation resolver', error)
      }
    },
    userSignIn: async (_, {userSignInItem}) => {
      try {
        return await AuthenticationService.userSignIn(userSignInItem);
      } catch (error) {
        console.log('error in userSignIn mutation resolver', error)
      }
    }
  },
};

module.exports = resolvers;
