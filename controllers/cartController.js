const db = require('../db');

// Menambahkan item ke keranjang
exports.addToCart = (req, res) => {
  const { user_id, product_id, product_name, product_price, quantity } = req.body;

  // Validasi input
  if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
  }
  if (!product_id) {
      return res.status(400).json({ error: "product_id is required" });
  }
  if (!quantity) {
      return res.status(400).json({ error: "quantity is required" });
  }
  if (!product_name) {
      return res.status(400).json({ error: "product_name is required" });
  }
  if (!product_price) {
      return res.status(400).json({ error: "product_price is required" });
  }

  // SQL untuk memasukkan item ke dalam tabel carts
  const sql = 'INSERT INTO carts (user_id, product_id, product_name, product_price, quantity) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, product_id, product_name, product_price, quantity], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, user_id, product_id, product_name, product_price, quantity });
  });
};

// Mengambil keranjang pengguna
exports.getCartItems = (req, res) => {
    const userId = req.params.user_id;

    const sql = 'SELECT * FROM carts WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};