const express = require('express');
const router = express.Router();
const db = require('../db');

/* CURRENCIES */

router.get("/:id", (req, res) => {
    const query = `SELECT * FROM 'currency' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        console.log(rows);
        res.json({ rows })
    });
});

router.get("/", (req, res) => {
    const query = `SELECT * FROM 'currency'`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        rows.forEach(row => {
            console.log(row);
        })
        res.json({ rows })
    });
});

module.exports = router;