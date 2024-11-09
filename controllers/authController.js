const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    console.log("Request Body:", req.body); // Log request body
    const { nama, username, email, password, password_confirmation } = req.body;

    // Cek jika password dan password_confirmation tidak ada
    if (!password || !password_confirmation) {
        return res.status(400).json({ message: "Password and confirmation are required." });
    }

    if (password !== password_confirmation) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log("Hashed Password:", hashedPassword); // Log hashed password

    const sql = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [nama, username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error("Database Error:", err); // Log error database
            return res.status(500).json({ message: "Error registering user." });
        }
        res.status(201).json({ message: "User registered successfully!" });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error logging in." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ accessToken: null, message: "Invalid password." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        res.status(200).json({ accessToken: token, user });
    });
};

exports.logout = (req, res) => {
    // Token-based logout can be implemented on client-side, server-side logic can be added if necessary
    res.status(200).json({ message: "Logout successful!" });
};
