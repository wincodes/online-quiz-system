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

module.exports = router;