// Instalamos o morgan (npm i morgan), e instalamos e executamos o express, depois damos um require no nosso documento e iniciamos o express
const express = require("express");
const app = express();
// Precisamos dar um require no morgan após verificar que a página foi devidamente renderizada
const morgan = require("morgan");

// Depois de dar um require, precisamos executar nossa função através do código abaixo
morgan("tiny");
// O comando acima é uma maneira de dizermos ao nosso código para usar o middleware do morgan

// Poderíamos usar o app.use, e ele nos traria um retorno com o código inserido conforme abaixo para cada solicitação do lado do cliente.Porém estaremos utilizando um middleware
// app.use(()=>{
//     console.log("hey!");
// })

// criamos nossa primeira rota de acesso para uma página inicial
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// Copiamos a rota acima para implementar outra rota de teste
app.get("/dogs", (req, res) => {
  res.send("Woof Woof");
});

// Localhost sendo executado na porta 3000
app.listen(3000, () => {
  console.log("App running on localhost:3000");
});
