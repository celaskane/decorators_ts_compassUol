// primeira classe com decorator 
//(tsconfig.json => experimentalDecorators: true)

function Entrar(textoEntrada: string) {
    return function(constructor: Function) {
        console.log(textoEntrada);
        console.log(constructor);
    };
}

function ComTemplate(template: string, puxaId: string) {
    // _ para simbolizar queo constructor não será utilizado
    return function(constructor: any) {
        const puxaElemento = document.getElementById(puxaId);
        const p = new constructor();
        if (puxaElemento) {
            puxaElemento.innerHTML = template;
            puxaElemento.querySelector('h1')!.textContent = p.nome;
        }
    }
}

//@Entrar('Entrando...')
@ComTemplate('<h1>Meu Objeto Pessoal</h1>', 'app')
class Pessoa {
    nome = 'Alejandro';

    constructor() {
        console.log('Criando um objeto pessoa');
    }
}

const pessoa = new Pessoa();
console.log(pessoa);
