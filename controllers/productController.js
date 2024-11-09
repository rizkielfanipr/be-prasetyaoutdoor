const db = require('../db');

exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM product', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(200).json(results);
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM product WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(results[0]);
    });
};
