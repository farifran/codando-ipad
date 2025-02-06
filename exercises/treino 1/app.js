//Peça ao usuário para inserir seu nome usando prompt. Em seguida, mostre um alerta de boas-vindas usando esse nome.
let nome = prompt('Qual é o seu nome?');
console.log('Nome escolhido:', nome);
let diaSemana = prompt('Qual é o dia da semana?').toLowerCase().trim();
console.log('Dia escolhido:', diaSemana);
//Pergunte ao usuário qual é o dia da semana. Se a resposta for "Sábado" ou "Domingo", mostre "Bom fim de semana!". Caso contrário, mostre "Boa semana!".
const fimDeSemana = ['sábado', 'sabado', 'domingo', '7', '1'];
if (fimDeSemana.includes(diaSemana)) {
  alert('Bom fim de semana!');
} else {
  alert('Boa semana!');
}
//Verifique se um número digitado pelo usuário é positivo ou negativo. Mostre um alerta informando.
let numero = prompt('Escolha um número positivo ou negativo');
if (numero > 0) {
  alert('Positivo');
} else {
  alert('Negativo');
}
//Crie um sistema de pontuação para um jogo. Se a pontuação for maior ou igual a 100, mostre "Parabéns, você venceu!". Caso contrário, mostre "Tente novamente para ganhar.".
let puntuacao = prompt('Indique puntuacao');
if (puntuacao >= 100) {
  alert('Parabens, voce ganhou um premio');
}else {
  alert('Que pena, voce nao ganhou um premio');
}
//Crie uma mensagem que informa o usuário sobre o saldo da conta, usando uma template string para incluir o valor do saldo.
let saldoConta = 500;
alert(`${nome} seu saldo hoje ${diaSemana} é de ${saldoConta}`);