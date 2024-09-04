require('dotenv').config(); // Place this at the top of your server.js file
const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken'); // Add JWT library
const typeDefs = require('./graphql/typeDefs/typeDefs');
const resolvers = require('./graphql/resolvers/resolver');
const { AuthenticationError } = require('apollo-server-express'); // Import error handling

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to authenticate the user using JWT
const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Get the token from headers
    const token = req.headers.authorization || '';
    const user = getUser(token.replace('Bearer ', '')); // Remove 'Bearer ' from token if present

    // If user cannot be authenticated, throw an authentication error
    if (!user) {
      throw new AuthenticationError('You must be logged in!');
    }

    // Add user to context
    return { user };
  },
});

// Start the Apollo Server
async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Extract the token and get the user info
      const token = req.headers.authorization || '';
      const user = getUser(token.replace('Bearer ', ''));
      return { user };
    }
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
