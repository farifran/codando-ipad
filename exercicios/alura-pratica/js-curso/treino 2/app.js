//Crie um contador que comece em 1 e vá até 10 usando um loop while. Mostre cada número.
var contador = 1;
while (contador <= 10) {
    alert(contador);
    contador++;
}
//Crie um contador que começa em 10 e vá até 0 usando um loop while. Mostre cada número.
var contador = 10;
while (contador >= 0) {
    alert(contador);
    contador--;
}
//Crie um programa de contagem regressiva. Peça um número e conte deste número até 0, usando um loop while no console do navegador.
var contador = prompt('Escolha um número para contar regressivamente');
while(contador >= 0) {
    alert(contador);
    contador--;
}
alert('Fim da contagem regressiva');
//Crie um programa de contagem progressiva. Peça um número e conte de 0 até esse número, usando um loop while no console do navegador.
let numero = prompt('Escolha um número para contar progressivamente');
var contador = 0;
while(contador < numero) {
    console.log(contador);
    contador++;
}