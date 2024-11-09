const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

module.exports = router;
