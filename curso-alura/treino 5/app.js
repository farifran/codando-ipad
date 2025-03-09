//Desafios
//Criar uma função que exibe "Olá, mundo!" no console.
//Criar uma função que recebe um nome como parâmetro e exibe "Olá, [nome]!" no console.
//Criar uma função que recebe um número como parâmetro e retorna o dobro desse número.
//Criar uma função que recebe três números como parâmetros e retorna a média deles.
//Criar uma função que recebe dois números como parâmetros e retorna o maior deles.
//Criar uma função que recebe um número como parâmetro e retorna o resultado da multiplicação desse número por ele mesmo

function saudação(){
    console.log('Olá, mundo!');
}

function saudaçãoConNome(nome){
    console.log(`Olá, ${nome}!`);
}

function dobro(numero){
    return numero * 2;
}

function media(num1, num2, num3){
    return (num1 + num2 + num3) / 3;
}

function maior(num1, num2){
    return num1 > num2 ? num1 : num2;
}

function quadrado(numero){
    return numero * numero;
}

saudação();
saudaçãoConNome('Alejandro');
console.log(dobro(4));
console.log(media(10, 20, 30));
console.log(maior(89, 98));
console.log(quadrado(5));