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

const p1 = new Produto('Livro1', 20);
const p2 = new Produto('livro2', 35);

// Autobind

function Autobind(_: any, _2: string, descricao: PropertyDescriptor) {
    const metodoOriginal = descricao.value;
    const adjDescricao: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = metodoOriginal.bind(this);
            return boundFn;
        }
    };
    return adjDescricao;
}

class Mostrador {
    mensagem = 'Está funcionando!!!';

    @Autobind
    mostraMensagem() {
        console.log(this.mensagem);
    }
}

const p = new Mostrador();

const botao = document.querySelector('button')!;
botao.addEventListener('click', p.mostraMensagem);


// Validação com Decorators

interface ValidaConfig {
    [propriedade: string]: {
        [validavelProp: string]: string[]
    }
}

const validaRegistrados: ValidaConfig = {};

function  Requerido(alvo: any, propNome: string) {
    validaRegistrados[alvo.constructor.nome] = {
        ...validaRegistrados[alvo.constructor.nome],
        [propNome]: ['requerido']
    };
}

function NumeroPositivo(alvo: any, propNome: string) {
    validaRegistrados[alvo.constructor.nome] = {
        ...validaRegistrados[alvo.constructor.nome],
        [propNome]: ['positivo']
    };
}

function Valida(obj: any) {
    const validaObjConfig = validaRegistrados[obj.constructor.nome];
    if (!validaObjConfig) {
        return true;
    }
    let ehValido = true;
    for (const prop in validaObjConfig) {
        console.log(prop);
        for (const validador of validaObjConfig[prop]) {
            switch (validador) {
                case 'requerido':
                    ehValido = ehValido && !obj[prop];
                    break;
                case 'positivo':
                    ehValido = ehValido && obj[prop] > 0;
                    break;
            }
        }
    }
    return ehValido;
}

class Curso {
    @Requerido
    titulo: string;
    @NumeroPositivo
    preco: number;

    constructor(t: string, p: number) {
        this.titulo = t;
        this.preco = p;
    }
}

const cursoForm = document.querySelector('form')!;
cursoForm.addEventListener('submit', event => {
    event.preventDefault();
    const tituloEl = document.getElementById('titulo') as HTMLInputElement;
    const precoEl = document.getElementById('preco') as HTMLInputElement;

    const titulo = tituloEl.value;
    const preco = +precoEl.value;

    const cursoCriado = new Curso(titulo, preco);
    
    if (!Valida(cursoCriado)) {
        alert('Entrada inválida, por favor tente novamente!');
        return;
    }
    console.log(cursoCriado);
});
