// Instalamos o morgan (npm i morgan), e instalamos e executamos o express, depois damos um require no nosso documento e iniciamos o express
const express = require("express");
const app = express();
// Precisamos dar um require no morgan após verificar que a página foi devidamente renderizada
const morgan = require("morgan");

// Depois de dar um require, precisamos executar nossa função através do código abaixo
//! morgan("tiny");
//! app.use(morgan("common"));
// O comando acima é uma maneira de dizermos ao nosso código para usar o middleware do morgan

// Poderíamos usar o app.use, e ele nos traria um retorno com o código inserido conforme abaixo para cada solicitação do lado do cliente.Porém estaremos utilizando um middleware
// Esse app.use fornece um console.log para cada solicitação no lado do cliente, o que nos permite criar algo com qualquer solicitação, seja um POST, GET etc
//! app.use(()=>{
//!     console.log("hey!");
//! })

// Poderíamos usar várias opções para nossas requests, como express.static(), express.json() ou urlencoded(), porém iremos usar o morgan como middleware

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

// Utilizando em caminhos especificos
app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS");
  next();
});

// Criando um middleware para proteger uma rota especifica
// Aplicamos o middleware dentro de uma constante e depois aplicamos ela como callback function dentro de um determinado path
const verifyPassword = (req, res, next) => {
  // Verificamos o que está sendo enviando dentro da request para podermos acessar a informação presente na query string
  // console.log(req.query);
  // next();

  // Após fazer a verificação criamos uma condicional para validar se o password que criamos está de acordo ou não para validar a senha
  const { password } = req.query;
  if (password === "password") {
    next();
  } else {
    res.send("sorry you need a password");
  }
};

// Criando um middleware para autenticar TODAS as rotas
// app.use((req, res, next) => {
// Verificamos o que está sendo enviando dentro da request para podermos acessar a informação presente na query string
// console.log(req.query);
// next();

// Após fazer a verificação criamos uma condicional para validar se o password que criamos está de acordo ou não para validar a senha
// const { password } = req.query;
// if (password === "password") {
//   next();
// } else {
//   res.send("sorry you need a password");
// }
// });

// Exemplo para realizar a mesma função do morgan enviando o tipo de método que está sendo utilizado e também o caminho para o qual o request está sendo feito
// app.use((req, res, next) => {
//   console.log(req.method.toUpperCase(), req.path);
//   return next();
// });

// Para utilizar um padrão de middleware

// app.use((req, res, next) => {
//   console.log("FIRST MIDDLEWARE");
//   next();
//   console.log("AFTER NEXT");
// });

// app.use((req, res, next) => {
//   console.log("SECOND MIDDLEWARE");
//   next();
// });

// Ver o retorno ao executar uma request

// Executando o Return dentro do next (método mais recomendado)
// app.use((req, res, next) => {
//   console.log("FIRST MIDDLEWARE");
//   return next();
//   console.log("AFTER NEXT");
// });

// app.use((req, res, next) => {
//   console.log("SECOND MIDDLEWARE");
//   return next();
// });

// criamos nossa primeira rota de acesso para uma página inicial
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// Copiamos a rota acima para implementar outra rota de teste
app.get("/dogs", (req, res) => {
  res.send("Woof Woof");
});

// Criando uma rota para proteger especificamente aquela rota
// Digamos que essa seja a rota que queremos proteger, então definimos nossa função middleware declarada acima para ser implementada como callback function dentro do nosso path abaixo
app.get("/secret", verifyPassword, (req, res, next) => {
  res.send("SECRET");
});
// Quando implementamos a função de verificar o password o que recebemos como retorno é o nosso next que no exemplo acima passa a ser a função callback declarada

// Criando uma rota middleware 404 para not found
app.use((req, res) => {
  // Enviamos um status e na sequencia podemos enviar uma página 404 ou simplesmente uma mensagem para o usuário
  res.status(404).send("NOT FOUND");
});

// Localhost sendo executado na porta 3000
app.listen(3000, () => {
  console.log("App running on localhost:3000");
});
