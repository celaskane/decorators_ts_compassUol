// primeira classe com decorator 
//(tsconfig.json => experimentalDecorators: true)

function Entrar(textoEntrada: string) {
    return function(constructor: Function) {
        console.log(textoEntrada);
        console.log(constructor);
    };
}

@Entrar('Entrando...')
class Pessoa {
    nome = 'Alejandro';

    constructor() {
        console.log('Criando um objeto pessoa');
    }
}

const pessoa = new Pessoa();
console.log(pessoa);
