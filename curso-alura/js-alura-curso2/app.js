//let listaDeNumeroSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //if(texto === undefined) {
    //    console.log('sem texto na tag', tag);
    //}
}  
function exibirMensagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();
/*
function gerarNumeroAleatorio(listaDeNumeroSorteados) {
    let numeroEscolhido = parseInt(Math.random() * 4 + 1);
    if (listaDeNumeroSorteados.includes(numeroEscolhido)){ 
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log('listaDeNumeroSorteados', listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}
*/
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${ palavraTentativas}!`;
    if (numeroSecreto == chute){
        exibirNaTela('h1', 'Acertou!');
        exibirNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirNaTela('p', 'O número secreto é menor');
        } else {
            exibirNaTela('p', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
    }

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    limparCampo();
}


