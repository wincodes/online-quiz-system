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

    //variable definations
    const name = req.body.name;
    const email = req.body.email;
    let answers = req.body.answers;

    const numAnswered = answers.length

    let rightAnswers = []


    //get each answers from the array of answers and push to the array for correct answers
    for (const result of answers || []) {
        if (result.ans === result.correct_answer) {

            rightAnswers.push({ id: result.id, ans: result.ans, c: result.correct_answer })
        }
    }


    //percentage result
    var percent = (rightAnswers.length / numAnswered) * 100;
    // console.log(percent + '%');


    //create the user data to send to Answers.json file
    var userData = [{
        'Name': name,
        'Email': email,
        'Percentage Score': percent
    }]


    //get the array of questions answered and push to the user data
    for (const result of answers || []) {
        var questionDetails = [{
            'Question ID': result.id,
            'Answer Provided': result.ans,
            'Correct Answer': result.correct_answer
        }]
        userData.push(questionDetails);
    }

    //require jsonfile
    const jsonfile = require('jsonfile')

    const file = 'Answers.json'

    //append to answers.json
    jsonfile.writeFile(file, userData, { flag: 'a', spaces: 2, EOL: '\r\n' }, function(err) {
        if (err) console.error(err)
    })


    //send the request
    res.status(201).send()
    res.data = ''
})

module.exports = router;