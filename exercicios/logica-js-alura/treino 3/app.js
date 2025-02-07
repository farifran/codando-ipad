//Crie uma variável chamada "nome" e atribua a ela o seu nome. Em seguida, utilize o console.log para exibir a mensagem "Olá, [seu nome]!" no console do navegador.
let nome = 'Rafael';
console.log(`Olá, ${nome}!`);

//Utilize o alert para exibir a mensagem "Olá, [seu nome]!".
alert(`Olá, ${nome}!`);

//Utilize o prompt e faça a seguinte pergunta: Qual a linguagem de programação que você mais gosta?.Em seguida, armazene a resposta em uma variável e mostre no console do navegador.
let linguagem = prompt('Qual a linguagem de programação que vocé mais gosta:');
console.log(linguagem);

//Crie uma variável chamada "valor1" e outra chamada "valor2", atribuindo a elas valores numéricos de sua escolha.Em seguida, realize a soma desses dois valores e armazene o resultado em ……m loop while para imprimir os números de 1 a 10 no console.
let valor1 = 7; let valor2 = 9; let soma = valor1 + valor2;

//Crie uma variável "nota" e atribua um valor numérico a ela.Use if-else para determinar se a nota é maior ou igual a 7 e exiba "Aprovado" ou "Reprovado" no console.
let nota = soma;
if (soma >= 7){
    alert('Aprovado');
}else{
    alert('Reprovado');
}

//Use o Math.random para gerar um número inteiro entre 1 e 10 e exiba esse número no console.
let numeroAleatorio = Math.random() * 10 + 1;
console.log(parseInt(numeroAleatorio));

//Use o Math.random para gerar um número inteiro entre 1 e 1000 e exiba esse número no console
numeroAleatorio = parseInt(Math.random() * 1000 + 1);
alert(numeroAleatorio);