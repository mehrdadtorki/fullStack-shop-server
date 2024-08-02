const ProductRepository = require('../infrastructure/repositories/ProductRepository');
const productRepository = new ProductRepository();
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error('Error executing query', err);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProduct(req.params.id);
    if (!req.params.id) {
      throw new Error('product id must be provided');
    } else {
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).send(product);
        return product;
      }
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
};

const addProduct = async (req, res) => {
  const productData = req.body;
  try {
    const result = await Product.addProduct(productData);
    // Check if the result contains insertId
    if (result[0].insertId) {
      res.status(201).json({
        message: 'Product created',
        product: {
          name: productData.name,
          quantityInStock: productData.quantityInStock,
          unitPrice: productData.unitPrice,
          discountPercentage: productData.discountPercentage,
          imageUrl: productData.imageUrl,
          priceAfterDiscount: productData.priceAfterDiscount,
          description: productData.description,
        },
      });
    } else {
      throw new Error('error in adding product in controller');
    }
  } catch (error) {
    console.error('Error in addProduct controller', error);
    res.status(500).json({
      message: 'Error adding product',
      error: error.message,
    });
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
    if (updatedProduct) {
      res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } else {
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

const deleteProduct = async (req, res) => {
  const selectedProductId = req.params.id;
  try {
    const result = await Product.deleteProduct(selectedProductId);
    if (result) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(500).json({ message: 'result can not be find in deleting' });
    }
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
