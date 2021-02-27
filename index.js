const express = require('express');
const app = express();
const path = require('path');
const db = require("./db");




var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json())
// rotas
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './public','index.html'));
});

app.get('/audio/:id', (req, res) => {
    return res.send('Escutar áudio' + req.params.id)
});

app.get('/comentario', async (req, res) => {
    const mensagens = await db.selectMensagens();
    console.log('get comentarios')
    res.send(mensagens);
});

app.post('/comentario', async (req, res) => {
    console.log('cadastro comentario')
    let mensagem = req.body.mensagem; 
    await db.insertMensagens(mensagem)
    return res.send('Cadastra comentário')
});


app.listen(3000,() => {
    console.log('Servidor rodando!');
});
