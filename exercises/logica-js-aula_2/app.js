alert('Boas vindas ao jogo do número secreto');
let numeroSecreto = 5;
console.log('Valor numero secreto:', numeroSecreto);
let chute = prompt('Escolha um número entre 1 e 10');
console.log('Valor chute:', chute);
if (chute == numeroSecreto) {
    console.log('Resultado da comparacao:', chute == numeroSecreto);
    alert(`Isso ai! Você descobriu o número secreto ${numeroSecreto}`);
} else {
    alert('Você errou :(');
    console.log('Valor numero secreto:', numeroSecreto);
}