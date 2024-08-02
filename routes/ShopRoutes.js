const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/ShopControllers');

// get request routing
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

// send request routing
router.post('/newProduct', addProduct);
router.post('/updateProduct/:id', updateProduct);
router.post('/deleteProduct/:id', deleteProduct);

module.exports = router;
