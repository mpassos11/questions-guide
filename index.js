const express = require('express');
const app = express();

// configure EJS view engine
app.set('view engine', 'ejs');

app.get("/:name/:lang", (req, res) => {
    var name = req.params.name;
    var lang = req.params.lang;
    var showMsg = false;
    var products = [
        {
            name: 'Doritos',
            price: 3.14
        },
        {
            name: 'Coca-Cola',
            price: 5
        },
        {
            name: 'Milk',
            price: 1.45
        },
        {
            name: 'Carne',
            price: 15
        },
        {
            name: 'RedBull',
            price: 6
        },
        {
            name: 'Nescau',
            price: 4
        }
    ];

    res.render('index', {
        nome: name,
        lang: lang,
        empresa: "Guia do Programador",
        msg: showMsg,
        products: products
    });
});

app.listen(4000, () => { console.log('App working!'); });
