
let nome = prompt('Qual é o seu nome?');
console.log('Nome escolhido:', nome);
let diaSemana = prompt('Qual é o dia da semana?').toLowerCase().trim();
console.log('Dia escolhido:', diaSemana);

const fimDeSemana = ['sábado', 'sabado', 'domingo', '7', '1'];

if (fimDeSemana.includes(diaSemana)) {
  alert('Bom fim de semana!');
} else {
  alert('Boa semana!');
}

let numero = prompt('Escolha um número positivo ou negativo');
if (numero > 0) {
  alert('Positivo');
} else {
  alert('Negativo');
}

let puntuacao = prompt('Indique puntuacao');
if (puntuacao >= 100) {
  alert('Parabens, voce ganhou um premio');
}else {
  alert('Que pena, voce nao ganhou um premio');
}

let saldoConta = 500;
alert(`${nome} seu saldo hoje ${diaSemana} é de ${saldoConta}`);