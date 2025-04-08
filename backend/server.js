const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'weather',
    password: process.env.PG_PASSWORD || 'yourpassword',
    port: process.env.PG_PORT || 5432,
});

// Check DB connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error(' Failed to connect to PostgreSQL:', err.stack);
    }
    console.log(' Connected to PostgreSQL');
    release();
});

// Get distinct states
app.get('/api/states', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT state FROM location');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get cities for a state
app.get('/api/cities', async (req, res) => {
    const { state } = req.query;
    try {
        const result = await pool.query(
            'SELECT DISTINCT city FROM location WHERE state = $1',
            [state]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get weather forecast
app.get('/api/forecast', async (req, res) => {
    const { state, city } = req.query;
    try {
        const location = await pool.query(
            'SELECT id FROM location WHERE state = $1 AND city = $2',
            [state, city]
        );

        if (location.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const locationId = location.rows[0].id;

        const weather = await pool.query(
            'SELECT condition FROM data WHERE location_id = $1 LIMIT 1',
            [locationId]
        );

        if (weather.rows.length === 0) {
            return res.status(404).json({ error: 'No weather data found' });
        }

        res.json({ condition: weather.rows[0].condition });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(` Server running at http://localhost:${port}`);
});
