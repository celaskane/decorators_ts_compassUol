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
    return function<T extends {new(...args: any[]): {nome: string}}>(constructorOriginal: T) {
        return class extends constructorOriginal {
            constructor(..._: any[]) {
                super();
                console.log('Renderizando template');
                const puxaElemento = document.getElementById(puxaId);
                if (puxaElemento) {
                    puxaElemento.innerHTML = template;
                    puxaElemento.querySelector('h1')!.textContent = this.nome;
                }
            }
        }
    };
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

function Log2(alvo: any, nome: string, descricao: PropertyDescriptor) {
    console.log('Accessor Decorator');
    console.log(alvo);
    console.log(nome);
    console.log(descricao);
}

function Log3(alvo: any, nome: string | Symbol, descricao: PropertyDescriptor) {
    console.log('Método Decorator');
    console.log(alvo);
    console.log(nome);
    console.log(descricao);
}

function Log4(alvo: any, nome: string | Symbol, posicao: number) {
    console.log('Parâmetro Decorator');
    console.log(alvo);
    console.log(nome);
    console.log(posicao);
}

class Produto {
    @LogIn
    titulo: string;
    private _preco: number;

    @Log2
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

    @Log3
    getPrecoComTaxa(@Log4 taxa: number) {
        return this._preco * (1 + taxa)
    }
}