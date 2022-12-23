const nomes: Array<string | number> = [];   //generic type
//nomes.[0].split(' ');

// Promisses
const promise: Promise<any> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Está feito!');     //com <any> é possível passar qualquer tipo de dado aqui
    }, 2000);
});

promise.then(data => {
    data.split(' ');
});

// Criando uma Generic Function (não funciona sem o extends)
/* function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
console.log(merge({nome: 'Alejandro'}, {idade: 77}));

const mergedOBj = merge({nome: 'Alejandro'}, {idade: 77}); */

// Type Constraints (extends)
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({nome: 'Alejandro', hobbies: ['Qualquer']}, {idade: 77});
console.log(mergedObj);

// Outra função genérica

interface Comprimento {
    length: number;
}

function contaEDescreve<T extends Comprimento>(elemento: T) {
    let textoDescritivo = 'Não tem valor';
    if (elemento.length > 0) {
        textoDescritivo = 'Possui um elemento';
    } else if (elemento.length > 1) {
        textoDescritivo = 'Possui ' + elemento.length + ' elementos';
    }
    return [elemento, textoDescritivo];
}

console.log(contaEDescreve(['Hola', 'señores!']));

// keyof Constraint
function extraiEConverte<T extends object, U extends keyof T>(
    obj: T, 
    key: U
    ) {
    return 'Valor: ' + obj[key];
}

extraiEConverte({ nome: 'Leandros' }, 'nome');  // key só permite acessar um componente do objeto

// Classes Genéricas
class Armazena<T extends string | number | boolean> {
    private dado: T[] = [];

    incluiItem(item: T) {
        this.dado.push(item);   //incluindo um elemento na array
    }

    apagaItem(item: T) {
        if (this.dado.indexOf(item) === -1)
            return;
        this.dado.splice(this.dado.indexOf(item), 1); //removendo um elemento da array
    }

    getItens() {
        return [...this.dado];
    }
}

const armazenaTexto = new Armazena<string>();
armazenaTexto.incluiItem('Meu textinho');
armazenaTexto.incluiItem('Outro textinho');
armazenaTexto.apagaItem('Outro textinho');      //tchau textinho :/
console.log(armazenaTexto.getItens());

const armazenaNumero = new Armazena<number>();

/* const objArmazendo = new Armazena<object>();
objArmazendo.incluiItem({nome: 'Alejandro'});
objArmazendo.incluiItem({nome: 'Leandro'});
objArmazendo.apagaItem({nome: 'Alejandro'});
console.log(objArmazendo.getItens()); */

interface ObjetivoCurso {
    titulo: string;
    descricao: string;
    finalizaAte: Date;
}

function criaObjetivoCurso(
    titulo: string, 
    descricao: string, 
    data: Date
    ): ObjetivoCurso {
        //Partial torna propriedades da interface opcionais
        let ObjetivoCurso: Partial<ObjetivoCurso> = {};
        ObjetivoCurso.titulo = titulo;
        ObjetivoCurso.descricao = descricao;
        ObjetivoCurso.finalizaAte = data;
        return ObjetivoCurso as ObjetivoCurso;
}

const nominais: Readonly<string[]> = ['Alejandro', 'Tarot'];
//nominais.push('lalaa')
//nominais.pop();