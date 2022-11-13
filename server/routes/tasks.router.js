const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get
router.get('/', (req, res) => {
    // Get tasks from database
    let queryText = `SELECT * FROM "tasks_list";`;
    pool.query(queryText)
        .then((result) => {
            console.log('successful GET');
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error with GET ', error);
            res.sendStatus(500);
        })
});

// Post
router.post('/', (req, res) => {
    // Add new task to database
    const newTask = req.body;
    const queryText = `INSERT INTO "tasks_list"
                        ("name","description","date","completed")
                        VALUES ($1, $2, $3, $4)
    `;
    pool.query(queryText, [newTask.name, newTask.description, newTask.date, newTask.completed])
        .then(() => {
            console.log('successful POST');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error with POST ', error);
            res.sendStatus(500);
        })
});

// Put
router.put('/:id', (req, res) => {
    // Change task to completed
    const queryText = `UPDATE "tasks_list" SET "completed" = true WHERE id=$1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Successfully set task to completed');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error with PUT ', error);
            res.sendStatus(500);
        })
});

// Delete
router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM "tasks_list" WHERE id = $1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Deleted task successfully');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error with DELETE ', err);
            res.sendStatus(500);
        })
});

module.exports = router;