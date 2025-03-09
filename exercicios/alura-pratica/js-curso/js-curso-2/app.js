let titulo = document.querySelector('h1');
titulo.innerHTML = 'Hora do Desafio';

function verificarBotao(){
    console.log('Botão foi clicado');
}

function mensagemAlerta(){
    alert('Eu amo JS');
}

function mensagemCiudad(){
    let cidade = prompt(`Diga o nome de uma cidade?`);
    alert(`Estive em ${cidade} e lembrei de voce!`);
}

function somaDois(){
    let numero1 = parseInt(prompt('Escolha um número'));
    let numero2 = parseInt(prompt('Escolha outro número'));
    let soma = numero1 + numero2;
    alert('A soma de ' + numero1 + ' + ' + numero2 + ' = ' + soma);
}