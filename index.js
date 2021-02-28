const express = require("express");
const app = express();
const rotas = require("./rotas");

var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/",rotas);

app.listen(3000, () => {
  console.log("Servidor rodando!");
});
