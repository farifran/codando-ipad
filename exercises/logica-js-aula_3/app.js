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
