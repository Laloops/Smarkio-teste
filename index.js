const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'index'}))
app.set('view engine', 'handlebars')

// rotas
app.get('/', (req, res) => {

    const data = [
        {
            texto:'Comentario 1',
            id:1
        },
        {
            texto:'Comentário 2',
            id:2
        }
    ]

    return res.render('comentarios', {lista:data});

});


app.get('/audio/:id', (req, res) => {
    return res.send('Escutar áudio' + req.params.id)
});

app.post('/comentario', (req, res) => {
    return res.send('Cadastra comentário')
});


app.listen(3000,() => {
    console.log('Servidor rodando!');
});
