
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/states', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT state FROM location');
        res.json(result.rows.map(row => row.state));
    } catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.get('/cities', async (req, res) => {
    try {
        const { state } = req.query;
        const result = await pool.query(
            'SELECT DISTINCT city FROM location WHERE state = $1',
            [state]
        );
        res.json(result.rows.map(row => row.city));
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
