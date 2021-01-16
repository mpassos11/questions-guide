const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const questionModel = require('./database/Question');
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

app.listen(4000, () => { console.log('App working!'); });
