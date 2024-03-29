const express = require('express');
const router = express.Router();
const db = require('../db');

/* CATEGORIES */
/* GET */
router.get("/:id", (req, res) => {
    const query = `SELECT * FROM 'category' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {

            res.status(400).json({ "error": err.message })
        }
        console.log(rows);
        res.json({ rows })
    });
});

router.get("/name/:name", (req, res) => {
    const query = `SELECT * FROM 'category' WHERE name = '${req.params.name}'`;
    db.all(query, (err, rows) => {
        if (err) {

            res.status(400).json({ "error": err.message })
        }
        console.log(rows);
        res.json({ rows })
    });
});

router.get("/", (req, res) => {
    const query = `SELECT * FROM 'category'`;
    db.all(query, [], (err, rows) => {
        if (err) {

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
    const { name } = req.body;
    db.run(`INSERT INTO 'category' (name) VALUES (?)`,
        [name],
        (err, result) => {
            if (err) {

                res.status(400).json({ "error": err.message })
            }
            res.status(201).json({
                "message": `Category added`,
            })
        });
});
/* DELETE */
router.delete("/:id", (req, res) => {
    const query = `DELETE FROM 'category' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        res.status(201).json({
            "message": `Category id: ${req.params.id} deleted`,
        })
    });
});

/* PUT */
router.put("/:id", (req, res, next) => {
    console.log("req:", req.body);
    const { name } = req.body;
    db.run(`UPDATE 'category' set name = ? WHERE id = ?`,
        [name, req.params.id],

        (err, result) => {
            if (err) {
                res.status(400).json({ "error": err.message })
            }
            res.status(200).json({
                "message": `Category updated`,
            })
        });
});
module.exports = router;