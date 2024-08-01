const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use the shop routes
const ShopRoutes = require('./routes/ShopRoutes');
const CustomersRoutes = require('./routes/ShopRoutes');

app.use('/', ShopRoutes);
app.use('/customers', CustomersRoutes);

// Error handling middleware (optional, for better debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
