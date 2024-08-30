const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const typeDefs = require('./graphql/typeDefs/typeDefs')
const resolvers = require('./graphql/resolvers/resolver')

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('Unexpected error:', error);
    return {
      message: error.message,
      statusCode: error.extensions?.code || 500
    };
  },
});

// Start the Apollo Server
async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }));
}

startServer().then(() => {
  console.log('Apollo Server integrated with Express.');

  // Start the Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
