const express = require('express');
const app = express();

// configure EJS view engine
app.set('view engine', 'ejs');

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    res.render('index', {
        nome: nome,
        lang: lang,
        empresa: "Guia do Programador",
    });
});

app.listen(4000, () => { console.log('App rodando!'); });
