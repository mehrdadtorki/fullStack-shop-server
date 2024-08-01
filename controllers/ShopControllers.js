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
    const productData = req.body;
    const [result] = await Product.addProduct(productData);
    res.status(201).json({
      message: 'Product created',
      product: {
        id: result.insertId,
        name: productData.name,
        quantity: productData.quantity,
        unitPrice: productData.unitPrice,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const productUpdatedValue = req.body;
  try {
    const updatedProduct = await Product.updateProduct(
      productId,
      productUpdatedValue
    );
    res
      .status(200)
      .json({ message: 'Product added successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

const deleteProduct = async (req, res) => {
  selectedProductId = req.params.id;
  try {
    await Product.deleteProduct(selectedProductId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting product', error });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
