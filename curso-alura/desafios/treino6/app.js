/* 
Desafios
- Crie uma função que calcule o índice de massa corporal (IMC) de uma pessoa, a partir de sua altura, em metros, e peso, em quilogramas, que serão recebidos como parâmetro.
- Crie uma função que calcule o valor do fatorial de um número passado como parâmetro.
- Crie uma função que converte um valor em dólar, passado como parâmetro, e retorna o valor equivalente em reais. Para isso, considere a cotação do dólar igual a R$4,80.
- Crie uma função que mostre na tela a área e o perímetro de uma sala retangular, utilizando altura e largura que serão dadas como parâmetro.
- Crie uma função que mostre na tela a área e o perímetro de uma sala circular, utilizando seu raio que será fornecido como parâmetro. Considere Pi = 3,14.
- Crie uma função que mostre na tela a tabuada de um número dado como parâmetro.
*/

// IMC = peso / (altura * altura)
function calcularImc(peso, altura){
    return (peso / (altura * altura)).toFixed(2)
}
let peso = prompt('Indique seu peso em quilogramas:')
let altura = prompt('Indique sua e altura em metros:')

confirm(`Seu IMC é ${calcularImc(peso, altura)}. \nDeseja melhorar o regime de exercícios?`)

// Fatorial é um numero multiplicado por todos os seus antecessores, exceto o 0 e 1, sua formula é: n! = n * (n-1) * (n-2) * (n-3) * ... * 1 por exemplo factoria de 5 é 5 * 4 * 3 * 2 * 1 = 120
let numeroFatorial = prompt('Indique um número para calcular seu fatorial:')

function calcularFatorial(numeroFatorial){
    let fatorial = 1
    for (let i = 1; i <= numeroFatorial; i++){
        fatorial = fatorial * i
    }
    alert(`O fatorial de ${numeroFatorial} é ${fatorial}`)
}

calcularFatorial(numeroFatorial)

// Dólar = real * 4,80, função convertir valor em dolar passado como parametro
function convertirDolar(real, cotação){
    let dolar = real / cotação
    alert(`O valor em dolar é ${dolar.toFixed(2)}`)
}
let cotação = 4.80
let real = prompt('Indique o valor em reais:')
convertirDolar(real, cotação)

// Area e perimetro de uma sala retangular
function calcularAreaPerimetro(largura, alturaSala){
    let  area = largura * alturaSala
    let perimetro = 2 * (largura + alturaSala)
    alert('Olá mundo')
    alert(`O perimetro é igual a ${perimetro}m e a area é igual a ${area}m2`)
}
let largura = 10
let alturaSala = 5
calcularAreaPerimetro(largura, alturaSala)

