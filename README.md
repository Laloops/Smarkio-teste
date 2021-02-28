# Smarkio-teste (cadastro de comentários e Text-to-speech)

Página de captação de comentários, transformando texto para voz. 
Página criada utilizando NODE.js, MySQL e IBM watson.

## Começando

Essas instruções fornecerão uma cópia do projeto instalado e funcionando em sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Para executar o projeto, você vai precisar instalar o node.js e o servidor MySQL, rodando em localhost na porta 3306

### Instalando

Baixe o projeto para o seu computador, para isso você pode abrir o terminal na pasta onde deseja instalar o projeto e digitar o seguinte comando:

`` `
git clone https://github.com/Laloops/Smarkio-teste.git
`` `

Depois navegue até o diretório raiz e faça o download das dependências

`` `
npm install
`` `
Deve-se criar um banco de dados, chamado smarkio.
Feito isso, crie uma tabela para armazenar as mensagens:

`` `
create table smarkio.mensagens (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
texto VARCHAR(255) NOT NULL
)
`` `

Configure o seu usuário e senha do banco MySQL indo até o arquivo db.js e modifique as linhas 1 e 2, trocando os valores entre aspas pelos valores novos.

## Executando o programa

Para executar, abra o terminal no diretório raiz do projeto e digite:

`` `
node index.js
`` `

Pronto, seu servidor estará rodando!
Agora para acessá-lo, basta ir ao navegador e digitar:

`` `
http://localhost:3000/
`` `

## Desdobramento, desenvolvimento

Para utilizar o sistema em produção, deve-se alterar o endereço das URLs de acesso a API no arquivo index.html. 
Trocar os endereços (LOCALHOST) existentes, pelos endereços do servidor onde o sistema estará hospedado.

## Construído com

* [NODE.JS] (https://nodejs.org/en/docs/) - Servidor back-end
* [MySQL] (https://dev.mysql.com/doc/) - Banco de dados
* [IBMWatson] (https://www.ibm.com/br-pt/watson) - API de conversão de texto para voz



## Autores

* ** Camila Lopes ** - [Laloops] (https://github.com/Laloops)

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md] (LICENSE.md) para obter detalhes

## Agradecimentos

* Obrigada à SmarkIO pela oportunidade de participar deste processo seletivo que me trouxe um grande desafio, mas também uma grande satisfação!

