// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rute untuk menambahkan item ke keranjang
router.post('/cart', cartController.addToCart);

// Rute untuk mendapatkan item keranjang berdasarkan user_id
router.get('/:user_id', cartController.getCartItems);

module.exports = router;