const express = require('express');
const router = express.Router();
const fs = require('fs');


//get all quiz
router.get('/', (req, res) => {
    fs.readFile('Questions.json', (err, quiz_data) => {
        if (err) throw err;
        let quiz = JSON.parse(quiz_data);
        return res.send(quiz);
    });
});


//process the answers
router.post('/', (req, res) => {

    name = req.body;
    res.status(201).send();
    console.log(name);
})

module.exports = router;