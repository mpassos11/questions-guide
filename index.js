const express = require('express');
const app = express();

// configure EJS view engine
app.set('view engine', 'ejs');

// Configure static files in EJS
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(4000, () => { console.log('App working!'); });
