// Use the express.Router class to create modular, mountable route handlers. 
// A Router instance is a complete middleware and routing system; for this reason, 
// it is often referred to as a “mini-app”.
// all the routes and middleware are specific to this module.

// For project architeture prespective, we shoud put all our controllers to seperate file
// and import it here to attach to specific routes.

const express = require('express');
const router = express.Router();
const db = require('../db/db');

let appNotes = [];
let id = 0;

router.get('/', (req, res) => {
    let sql = `SELECT * FROM notes`;
    db.query(sql, (err, result, fields) => {
        if(err) {
            res.send({ 'error': 'An error has occurred', err });
        } else {
            console.log('res', result);
            console.log('fields', fields);
            const response = {
                notes: result,
                status_code: 200,
                message: 'success',
                v: 1.0
            }
            res.status(200).send(response);
        }
    });
});


router.post('/notes', (req, res, next) => {
    const { title, body } = req.body;
    const _notes = {
        title: title,
        body: body,
        id: id
    };
    appNotes.push(_notes);
    let sql = `INSERT INTO notes (title, body) VALUES (?, ?)`;
    db.query(sql, [title, body],  (err, result) => {
        if(err) {
            res.send({ 'error': 'An error has occurred', err }); 
        } else {
            console.log('res', result);
            const response = {
                title: title,
                body: body,
                status_code: 200,
                message: 'success',
                v: 1.0
            }
            res.status(200).send(response);
        }
    });
});

router.put('/notes/:id', (req, res, next) => {
    let id = Number(req.params.id);
    const { title, body } = req.body;
    const sql = `UPDATE notes SET title = ?, body = ? WHERE id = ?`
    db.query(sql, [title, body, id], (err, result, fields) => {
        if(err) {
            res.send({ 'error': 'An error has occurred', err }); 
        } else {
            console.log('res', result);
            const response = {
                title: title,
                body: body,
                status_code: 200,
                message: 'successfully updated',
                v: 1.0
            }
            res.status(200).send(response);
        }
    });
});

router.delete('/notes/:id', (req, res, next) => {
    let id = Number(req.params.id);
    let response;
    const sql = `DELETE FROM notes WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if(err) {
            res.send({ 'error': 'An error has occurred', err }); 
        } else {
            console.log('res', result);
            if(result.affectedRows) {
                 response = {
                    status_code: 200,
                    message: 'successfully deleted',
                    v: 1.0
                }
            } else {
                response = {
                    status_code: 400,
                    message: "id doesn't exists",
                    v: 1.0
                }
            }
            res.status(200).send(response);
        }
    });
});

module.exports = router;
