const express = require('express');
const router = express.Router();
const db = require('../db');

/* CURRENCIES */
/* GET */
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
/* POST */

router.post("/", (req, res, next) => {
    console.log("req:", req.body);
    const { name, symbol, acronym } = req.body;
    db.run(`INSERT INTO 'currency' (name, symbol, acronym) VALUES (?,?,?)`,
        [name, symbol, acronym],
        (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ "error": err.message })
            }
            res.status(201).json({
                "message": `Currency added`,
            })
        });
});

/* DELETE */
router.delete("/:id", (req, res) => {
    const query = `DELETE FROM 'transaction' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        res.status(201).json({
            "message": `Transaction id: ${req.params.id} deleted`,
        })
    });
});
module.exports = router;