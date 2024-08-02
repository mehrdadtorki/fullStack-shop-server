const { GraphQLObjectType, GraphQLList } = require('graphql');

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
      resolve() {
        return Product.getProducts();
      },
    },
  },
});

module.exports = { ProductType };
