alert('Boas vindas ao jogo do número secreto');
let numeroSecreto = parseInt(Math.random() * 100 + 1);
let chute;
let tentativas = 1;
console.log('Valor numero secreto:', numeroSecreto);
//enquanto chute for diferente de numeroSecreto
while (chute != numeroSecreto) {
    //lembrando que temos um acoplamento entre  rango do numero secreto e a proxima mensagem
    chute = prompt('Escolha um número entre 1 e 100');
    console.log('Valor chute:', chute);
    console.log('Resultado da comparação:', chute == numeroSecreto);
    if (chute ==numeroSecreto) {
       break;
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
//if(tentativas > 1) {
//    alert(`Isso ai! Você descobriu o número secreto ${numeroSecreto} em ${tentativas} tentativas`);   
//    }else {
//        alert(`Isso ai! Vocês descobriu o número secreto ${numeroSecreto} em ${tentativas} tentativa`);
//    }
let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
alert(`Isso ai! Vocês descubriu o numero secreto ${numeroSecreto} em ${tentativas} ${palavraTentativa}`);