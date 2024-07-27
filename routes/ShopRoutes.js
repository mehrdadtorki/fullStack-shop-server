const express = require('express');
const router = express.Router();

const { getAllProducts, getSingleProduct, addProduct } = require('../controllers/ShopControllers');

// get request routing
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

// send request routing
router.post('/newProduct', addProduct);

module.exports = router;