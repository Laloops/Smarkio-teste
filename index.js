const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.json())
// rotas
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './public','index.html'));
});

app.get('/audio/:id', (req, res) => {
    return res.send('Escutar áudio' + req.params.id)
});

app.get('/comentario', (req, res) => {
    const data = [
        {
            texto:'Comentario 1',
            id:1
        },
        {
            texto:'Lorem ipsum bli bli bli bla bla bla bla blo blu',
            id:2
        },
        {
            texto:'Comentário 3',
            id:2
        },
        {
            texto:'Comentário 4',
            id:2
        },
        {
            texto:'Comentário 4',
            id:2
        }
    ]
    console.log('get comentarios')
    res.send(data);
});

app.post('/comentario', (req, res) => {
    console.log('cadastro comentario')
    let mensagem = req.body.mensagem; 
    console.log(mensagem)
    return res.send('Cadastra comentário')
});


app.listen(3000,() => {
    console.log('Servidor rodando!');
});
