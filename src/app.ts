// primeira classe com decorator 
//(tsconfig.json => experimentalDecorators: true)

function Entrar(constructor: Function) {
    console.log('Entrando...');
    console.log(constructor);
}

@Entrar
class Pessoa {
    nome = 'Alejandro';

    constructor() {
        console.log('Criando um objeto pessoa');
    }
}

const pessoa = new Pessoa();
console.log(pessoa);
