async function connect() {
  if (global.connection && global.connection.state !== "Disconected")
    return global.connection;
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    "mysql://root:deltaloops777@localhost:3306/smarkio"
  );
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}
connect();

async function selectMensagens() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM mensagens;");
  return rows;
}

async function selectMensagem(id) {
  const conn = await connect();
  const sql = "SELECT (texto) FROM mensagens where (id=?);";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows;
}
async function insertMensagens(texto) {
  const conn = await connect();
  const sql = "INSERT INTO mensagens(texto) VALUES (?);";
  const values = [texto];
  await conn.query(sql, values);
}

//insert into smarkio.mensagens (texto) VALUES ('Lorem ipsum dolor blablabla casa teste 123')

module.exports = { selectMensagens, insertMensagens, selectMensagem };
