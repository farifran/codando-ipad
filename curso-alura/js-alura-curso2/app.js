let numeroSecreto = gerarNumeroAleatorio();

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //if(texto === undefined) {
    //    console.log('sem texto na tag', tag);
    //}
}  

exibirNaTela('h1', 'Jogo do número secreto');
exibirNaTela('p', 'Escolha um número entre 1 e 10');

function gerarNumeroAleatorio() {
    return parseInt(Math.random() * 10 + 1);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto == chute);
}

