const path = require("path");
const db = require("./db");
const fs = require("fs");
const watson = require("./watson");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// Recebe o ID da mensagem e devolve o áudio 
router.get("/audio/:id", async (req, res) => {
  const id = req.params.id;
  const filePath = path.join(
    __dirname,
    "./public/audio",
    "audio" + id + ".wav"
  );
  try {
    if (fs.existsSync(filePath)) {
      return res.sendFile(
        path.join(__dirname, "./public/audio", "audio" + id + ".wav")
      );
    }
  } catch (err) {
    console.error(err);
  }
  let mensagem;
  try {
     mensagem = await db.selectMensagem(id);
    if (mensagem == null || mensagem == undefined || mensagem.length == 0) {
      res.status(404).send("Não foi possível encontrar a mensagem");
      return;
    }
  } catch (e) {
    res.status(500).send("Ocorreu um erro");
    return;
  }
  watson
    .getAudio(mensagem[0]["texto"])
    .then((file) => {
      fs.writeFileSync(
        path.join(__dirname, "./public/audio/audio" + id + ".wav"),
        file
      );
      return res
        .status(200)
        .sendFile(
          path.join(__dirname, "./public/audio", "audio" + id + ".wav")
        );
    })
    .catch((er) => {
      res.status(500).send("Ocorreu um erro");
    });
});

router.get("/comentario", async (req, res) => {
  try {
    const mensagens = await db.selectMensagens();
    console.log("get comentarios");
    res.status(200).send(mensagens);
  } catch (e) {
    res.status(500).send("Ocorreu um erro");
  }
});

router.post("/comentario", async (req, res) => {
  const mensagem = req.body.mensagem || null;
  if (mensagem == null || mensagem.length > 255 || mensagem.length == 0) {
    res.status(400).send("Dados inválidos");
    return;
  }
  try {
    console.log("cadastro comentario");
    await db.insertMensagens(mensagem);
    return res.status(201).send("Cadastra comentário");
  } catch (e) {
    res.status(500).send("Ocorreu um erro");
  }
});

module.exports = router;