const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const questionModel = require('./database/Question');
const answerModel = require('./database/Answer');
const app = express();

// Connection with database
connection
    .authenticate()
    .catch((error) => {
        console.error(error);
    });

// configure EJS view engine
app.set('view engine', 'ejs');

// Configure static files in EJS
app.use(express.static('public'));

// Capture and translate form data to JS
app.use(bodyParser.urlencoded({extended: false}));

// Configure to read JSON data
app.use(bodyParser.json());

app.get("/", (req, res) => {
    questionModel.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/question', (req, res) => {
    res.render('question');
});

app.post('/question-save', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    questionModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/answer/:id', (req, res) => {
    var id = req.params.id;
    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if (question != undefined) {
            answerModel.findAll({
                where: {questionId: question.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(answers => {
                res.render('answer', {
                    question: question,
                    answers: answers
                });
            });
        } else {
            res.redirect('/');
        }
    })
});

app.post('/answer', (req, res) => {
    var body = req.body.body;
    var questionId = req.body.questionId;
    answerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/answer/' + questionId);
    });
});

app.listen(4000, () => { console.log('App working!'); });
