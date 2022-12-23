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
        console.log('Renderizando template');
        const puxaElemento = document.getElementById(puxaId);
        const p = new constructor();
        if (puxaElemento) {
            puxaElemento.innerHTML = template;
            puxaElemento.querySelector('h1')!.textContent = p.nome;
        }
    }
}

//@Entrar('Entrando...')
@Entrar('ENTRNADOOO')
@ComTemplate('<h1>Meu Objeto Pessoal</h1>', 'app')
class Pessoa {
    nome = 'Alejandro';

    constructor() {
        console.log('Criando um objeto pessoa');
    }
}

const pessoa = new Pessoa();
console.log(pessoa);

// ---
// Property Decorators
function LogIn(alvo: any, nomePropriedade: string | Symbol) {
    console.log('Property Decorator');
    console.log(alvo, nomePropriedade);
}

class Produto {
    @LogIn
    titulo: string;
    private _preco: number;

    set preco(valor: number) {
        if (valor > 0) {
            this._preco = valor;
        } else {
            throw new Error('Valor inválido - deve ser positivo.');
        }
    }

    constructor(t: string, n: number) {
        this.titulo = t;
        this._preco = n;
    }

    getPrecoComTaxa(taxa: number) {
        return this._preco * (1 + taxa)
    }
}