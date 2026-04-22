const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let db;

async function initDb() {
    db = await open({
        filename: './survival.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT NOT NULL,
            category TEXT NOT NULL,
            must_have_level INTEGER NOT NULL,
            survival_reason TEXT
        )
    `);

    // Seed data if empty
    const count = await db.get('SELECT COUNT(*) as count FROM items');
    if (count.count === 0) {
        await db.run('INSERT INTO items (item_name, category, must_have_level, survival_reason) VALUES (?, ?, ?, ?)', 
            ['Coffee', 'Drink', 10, 'Not a beverage. A core dependency.']);
        await db.run('INSERT INTO items (item_name, category, must_have_level, survival_reason) VALUES (?, ?, ?, ?)', 
            ['Charger', 'Tech', 10, 'More reliable than my sleep schedule.']);
        await db.run('INSERT INTO items (item_name, category, must_have_level, survival_reason) VALUES (?, ?, ?, ?)', 
            ['Instant Noodles', 'Food', 9, 'The unofficial sponsor of bad decisions and great demos.']);
        console.log('Database seeded with example items.');
    }
}

// API Endpoints
app.get('/api/items', async (req, res) => {
    try {
        const items = await db.all('SELECT * FROM items ORDER BY must_have_level DESC');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/items', async (req, res) => {
    const { item_name, category, must_have_level, survival_reason } = req.body;
    if (!item_name || !category || !must_have_level) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        await db.run(
            'INSERT INTO items (item_name, category, must_have_level, survival_reason) VALUES (?, ?, ?, ?)',
            [item_name, category, must_have_level, survival_reason]
        );
        res.status(201).json({ message: 'Item added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
