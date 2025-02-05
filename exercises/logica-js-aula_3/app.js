let diaSemana = prompt('Qual é o dia da semana?').toLowerCase();
console.log(diaSemana);

const fimDeSemana = ['sábado', 'sabado', 'domingo', '7', '1'];

if (fimDeSemana.includes(diaSemana)) {
  alert('Bom fim de semana!');
} else {
  alert('Boa semana!');
}