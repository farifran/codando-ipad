const objs = [
    {
        nome: "Rafael",
        idade: 42,
        esta_trabalhando: true,
        detalhes_profissao: {
            profissao: "Desenvolvedor",
            empresa: "Google",
            salario: 3000
        },
        hobbies: ["programar", "jogar", "ouvir musica"]
    },
    {
        nome: "João",
        idade: 25,
        esta_trabalhando: false,
        detalhes_profissao: {
            profissao: null,
            empresa: null,
            salario: null
        },
        hobbies: ["programar", "jogar", "ouvir musica"]
    }
];

// JSON
// converter objeto para JSON
const jsonData = JSON.stringify(objs); 

console.log(jsonData);
console.log(typeof jsonData);

// converter JSON para objeto
const objData = JSON.parse(jsonData);

console.log(objData);
console.log(typeof objData);

objData.map((pessoa) => {
    console.log(pessoa.nome);
});