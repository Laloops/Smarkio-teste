const express = require('express');

const app = express();

// rotas
app.get('/', (req, res) => {

    const comentarios = [
        {
            texto:'Comentario 1',
            id:1
        },
        {
            texto:'Comentário 2',
            id:2
        }
    ]

    return res.send(comentarios);

});


app.get('/audio/:id', (req, res) => {
    return res.send('Escutar áudio')
});

app.post('/comentario', (req, res) => {
    return res.send('Cadastra comentário')
});


app.listen(3000,() => {
    console.log('Servidor rodando!');
});
