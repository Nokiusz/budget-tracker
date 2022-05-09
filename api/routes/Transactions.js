const express = require('express');
const router = express.Router();
const db = require('../db');

/*TRANSACTIONS */
/* GET */
router.get("/list", (req, res) => {
    const query = `SELECT tr.id, tr.description, tr.value, c.name AS 'category', cur.name AS 'currency',cur.symbol AS 'currencySymbol',cur.acronym AS 'currencyAcronym' , tp.name AS 'type', p.name AS 'priority', tr.date FROM 'transaction' AS 'tr', 'type' AS 'tp', 'category' AS 'c', 'priority' AS 'p', 'currency' AS 'cur' WHERE tr.categoryID = c.id AND tr.currencyId = cur.id AND tr.typeID = tp.id AND tr.priorityId = p.id;`;
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

router.get("/list/:id", (req, res) => {
    const query = `SELECT tr.id, tr.description, tr.value, c.name AS 'category', cur.name AS 'currency',cur.symbol AS 'currencySymbol',cur.acronym AS 'currencyAcronym' , tp.name AS 'type', p.name AS 'priority', tr.date FROM 'transaction' AS 'tr', 'type' AS 'tp', 'category' AS 'c', 'priority' AS 'p', 'currency' AS 'cur' WHERE tr.categoryID = c.id AND tr.currencyId = cur.id AND tr.typeID = tp.id AND tr.priorityId = p.id AND tr.id = ${req.params.id};`;
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
    const query = `SELECT * FROM 'transaction' WHERE id = ${req.params.id}`;
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
    const query = `SELECT * FROM 'transaction'`;
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
    const { description, value, categoryId, currencyId, typeId, priorityId, date } = req.body;
    db.run(`INSERT INTO 'transaction' (description, value, categoryId, currencyId, typeId, priorityId, date) VALUES (?,?,?,?,?,?,?)`,
        [description, value, categoryId, currencyId, typeId, priorityId, date],

        (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ "error": err.message })
            }
            res.status(201).json({
                "message": `Transaction added`,
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

/* PUT */
router.put("/:id", (req, res, next) => {
    console.log("req:", req.body);
    const { description, value, categoryId, currencyId, typeId, priorityId, date } = req.body;
    db.run(`UPDATE 'transaction' set description = ?, value = ?, categoryId = ?, currencyId = ?, typeId = ?, priorityId = ?, date = ? WHERE id = ?`,
        [description, value, categoryId, currencyId, typeId, priorityId, date, req.params.id],

        (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ "error": err.message })
            }
            res.status(201).json({
                "message": `Transaction updated`,
            })
        });
});
module.exports = router;
