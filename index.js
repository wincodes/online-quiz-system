const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//initialize express
app = express();

//set the port
const port = process.env.PORT || 3000;

//use body parser
app.use(bodyParser.json());

app.use(cors());


//set the default route for quiz
const quiz = require('./quiz/quiz');

app.use('/quiz', quiz);

app.listen(port, function() {
    console.log(`server started on port ${port}....`);
});