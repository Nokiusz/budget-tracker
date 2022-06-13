const express = require('express');
const router = express.Router();
const db = require('../db');


router.get("/", (req, res) => {
    const query = `SELECT * FROM 'attachment'`;
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

router.get("/:id", (req, res) => {
    const query = `SELECT * FROM 'attachment' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        console.log(rows);
        res.json({ rows })
    });
});




router.post("/", (req, res) => {
    console.log("req:", req.body);
    const { url, transactionId } = req.body;
    db.run(`INSERT INTO 'attachment' (url, transactionId) VALUES (?,?)`,
        [url, transactionId],

        (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ "error": err.message })
            }
            res.status(201).json({
                "message": `Attachment added`,
            })
        });
});

router.delete("/:id", (req, res) => {
    const query = `DELETE FROM 'attachment' WHERE id = ${req.params.id}`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(400).json({ "error": err.message })
        }
        res.status(200).json({
            "message": `Attachments id: ${req.params.id} deleted`,
        })
    });
});


module.exports = router;