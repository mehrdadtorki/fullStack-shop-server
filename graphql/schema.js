const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const Product = require('../models/Product');

// Define ProductType
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    unitPrice: { type: GraphQLInt },
    quantityInStock: { type: GraphQLInt },
    discountPercentage: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
    priceAfterDiscount: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Product.getProduct(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.getProducts();
      },
    },
  },
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        unitPrice: { type: new GraphQLNonNull(GraphQLInt) },
        quantityInStock: { type: new GraphQLNonNull(GraphQLInt) },
        discountPercentage: { type: GraphQLInt },
        imageUrl: { type: GraphQLString },
        priceAfterDiscount: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        const productData = {
          name: args.name,
          unitPrice: args.unitPrice,
          quantityInStock: args.quantityInStock,
          discountPercentage: args.discountPercentage,
          imageUrl: args.imageUrl,
          priceAfterDiscount: args.priceAfterDiscount,
          description: args.description,
        };
        return Product.addProduct(productData);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
