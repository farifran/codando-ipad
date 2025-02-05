alert('Boas vindas ao jogo do número secreto');
const numeroSecreto = 5;
let chute;
let tentativas = 1;
console.log('Valor numero secreto:', numeroSecreto);
//enquanto chute for diferente de numeroSecreto
while (chute != numeroSecreto) {
    chute = prompt('Escolha um número entre 1 e 10');
    console.log('Valor chute:', chute);
    console.log('Resultado da comparação:', chute == numeroSecreto);
    if (chute ==numeroSecreto) {
        alert(`Isso ai! Você descobriu o número secreto ${numeroSecreto} em ${tentativas} tentativas`);
    } else {
        if (chute > numeroSecreto) {
        alert(`O numero secreto é menor que ${chute}`);
        } else {
        alert(`O numero secreto é maior que ${chute}`);
        }
        // tentativas = tentativas + 1;
        tentativas++;
    }
}