alert('Boas vindas ao nosso site');
let nome = 'Lua';
let idade = 25;
let numeroDeVendas = 50;
let saldoDisponivel = 1000;
const mensagemDeErro = 'Erro! Preencha todos os campos';
alert(mensagemDeErro);

nome = prompt('Escreva seu nome');
idade = prompt('Escreva sua idade');

if (idade >= 18) {
    alert('Pode tirar a Habilitação');
}