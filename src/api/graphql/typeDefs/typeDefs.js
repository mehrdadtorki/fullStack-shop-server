// schema/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type ProductType {
    product_id: Int
    name: String
    unit_price: Int
    quantity_in_stock: Int
    discount_percentage: Int
    image_url: String
    price_after_discount: Int
    description: String
  }

  type OrderType {
    order_id: Int
    customer_id: Int
    product_id: Int
    order_date: String
    quantity: Int
  }

  type CustomerType {
    customer_id: Int
    first_name: String
    last_name: String
    birth_date: String
    phone: String
    email: String
    password: String
    address: String
    city: String
    state: String
    points: Int
  }

  type Query {
    getAllProducts: [ProductType]
    getSingleProduct (id: Int!): ProductType

    getAllOrders: [OrderType]
    getCustomerOrders(id: Int!): [OrderType]

    getAllCustomers: [CustomerType]
    getCustomer(id: Int!): CustomerType
  }

  input ProductInput {
    product_id: Int
    name: String!
    unit_price: Int!
    quantity_in_stock: Int!
    discount_percentage: Int
    image_url: String!
    price_after_discount: Int
    description: String
  }

  input UserSignUp {
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
    password: String!
    confirmationPassword: String!
  }

  input UserSignIn {
    email: String!
    password: String!
  }

  type Mutation {
    addProduct(productItem: ProductInput!): Boolean
    updateProduct(productItem: ProductInput!): Boolean
    deleteProduct(id: Int!): Boolean

    userSignUp(userSignUpItem: UserSignUp) : Boolean
    userSignIn(userSignInItem: UserSignIn) : String!
  }

`;

module.exports = typeDefs;
