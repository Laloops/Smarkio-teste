const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const fs = require("fs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "0Z8DBOcRLa0nHSBhMZWPFFc4sXsTSN_G_UsAnuEk1QYC",
  }),
  serviceUrl: "https://api.us-south.text-to-speech.watson.cloud.ibm.com",
});

var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
// rotas
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.get("/audio/:id", async (req, res) => {
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

  const mensagem = await db.selectMensagem(id);
  const params = {
    text: mensagem[0]["texto"],
    voice: "pt-BR_IsabelaV3Voice",
    accept: "audio/wav",
  };

  textToSpeech
    .synthesize(params)
    .then((response) => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then((repairedFile) => {
      fs.writeFileSync(
        path.join(__dirname, "./public/audio/audio" + id + ".wav"),
        repairedFile
      );
      return res.sendFile(
        path.join(__dirname, "./public/audio", "audio" + id + ".wav")
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Ocorreu um erro");
    });
});

app.get("/comentario", async (req, res) => {
  const mensagens = await db.selectMensagens();
  console.log("get comentarios");
  res.send(mensagens);
});

app.post("/comentario", async (req, res) => {
  console.log("cadastro comentario");
  let mensagem = req.body.mensagem;
  await db.insertMensagens(mensagem);
  return res.send("Cadastra comentário");
});

app.listen(3000, () => {
  console.log("Servidor rodando!");
});
