var xhttp = new XMLHttpRequest();
const url = "http://localhost:3000";
var myAudio;
var capturando = "";

const respostaCadastraMensagem = function () {
  if (xhttp.readyState == 4 && (xhttp.status == 201 || xhttp.status == 200)) {
    document.getElementById("coment").value = "";
    capturando = "";
    carregarComentarios();
  } else if (
    xhttp.readyState == 4 &&
    (xhttp.status != 201 || xhttp.status != 200)
  ) {
    alert("Ocorreu um erro");
  }
};
const respostaBuscaMensagem = function () {
  if (xhttp.readyState == 4 && (xhttp.status == 201 || xhttp.status == 200)) {
    let data = JSON.parse(xhttp.response);
    document.getElementById("comentario-digitado").innerHTML = "";
    data.forEach((element) => {
      document.getElementById("comentario-digitado").innerHTML +=
        "<div class='dialogbox'>" +
        "<div class='body'> " +
        "<span class='tip tip-right'></span>" +
        "<div class='message'>" +
        "<span>" +
        element.texto +
        "</span>" +
        "</div>" +
        "</div>" +
        "  <div class='listen-button' onclick='audioListen(" +
        element.id +
        ")'><i class='fa fa-play-circle'></i>" +
        " Ouvir</div>" +
        "</div>" +
        "</div>";
    });
  } else if (
    xhttp.readyState == 4 &&
    (xhttp.status != 201 || xhttp.status != 200)
  ) {
    alert("Ocorreu um erro");
  }
};
const carregarComentarios = function () {
  xhttp.open("GET", url +"/comentario", true);
  xhttp.onload = respostaBuscaMensagem;
  xhttp.onerror = respostaBuscaMensagem;
  xhttp.send();
};
const cadastrarComentarios = function () {
  var data = {
    mensagem: capturando,
  };
  xhttp.open("POST", url +"/comentario", true);
  xhttp.onload = respostaCadastraMensagem;
  xhttp.onerror = respostaCadastraMensagem;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
};

function capturar() {
  capturando = document.getElementById("coment").value;
}

function valida_coment() {
  if (capturando == "") {
    alert("Por favor, escreva seu comentário");
    document.getElementById("coment").focus();
    return false;
  } else if (capturando.length > 255) {
    alert("Você ultrapassou o limite máximo de caracteres...");
    return false;
  } else {
    return true;
  }
}

function sndMsg() {
  capturar();
  if (valida_coment()) {
    cadastrarComentarios();
  }
}
document.getElementById("format-button").addEventListener("click", sndMsg);

function audioListen(id) {
  if (myAudio != undefined && myAudio.duration > 0 && !myAudio.paused) {
    myAudio.pause();
  } else {
    myAudio = new Audio(url +"/audio/" + id);
    myAudio.play();
  }
}
window.onload = function(){
  carregarComentarios();
}  
