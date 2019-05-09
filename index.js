const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//initialize express
app = express();



//use body parser
app.use(bodyParser.json());

app.use(cors());


//set the default route for quiz
const quiz = require('./quiz/quiz');

app.use('/quiz', quiz);

if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
//set the port
const port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log(`server started on port ${port}....`);
});