const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();
    res.send(products);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProduct(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.status(200).send(product);
    }
  } catch {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity, unitPrice } = req.body;
    const result = await Product.addProduct({ name, quantity, unitPrice });

    res.status(201).json({ message: 'Product added successfully', result });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
};
