type Admin = {
    nome: string;
    privilegios: string[];
};

type Empregado = {
    nome: string;
    dataInicio: Date;
};

//interface EmpregadoElevado extends Empregado, Admin { }
type EmpregadoElevado = Admin & Empregado;

const e1: EmpregadoElevado = {
    nome: 'Alejandro',
    privilegios: ['cria-servidor'],
    dataInicio: new Date()
};

type Combinavel = string | number;
type Numerico = number | boolean;
type Universal = Combinavel & Numerico;

function soma(a: Combinavel, b: Combinavel) {
    //type guard 
    //tipo Combinavel pode ser string ou number (condicional para cada tipo)
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type EmpregadoDesconhecido = Empregado | Admin; //union type

function mostraInfoEmpregado(emp: EmpregadoDesconhecido) {
    console.log('Nome: ' + emp.nome);
    if ('privilegios' in emp) {
        console.log('Privilegios: ' + emp.privilegios);
    }
    if ('dataInicio' in emp) {
        console.log('Data de Início: ' + emp.dataInicio);
    }
}

mostraInfoEmpregado(e1);
mostraInfoEmpregado({nome: 'Lisandro', dataInicio: new Date()});

class Carro {
    drive() {
        console.log('FAR... awaaaay');
    }
}

class Caminhao {
    drive() {
        console.log('Uma paixão chamada Scania');
    }

    cargaPesada(quantidade: number) {
        console.log('Eu conheço todas as cidades...' + quantidade);
    }
}

type Veiculo = Carro | Caminhao;

const v1 = new Carro();
const v2 = new Caminhao();

function usaVeiculo(veiculo: Veiculo) {
    veiculo.drive();
    //type guard mais elegante!!!
    //instanceof só serve para classes, não para interfaces
    if (veiculo instanceof Caminhao) {
        veiculo.cargaPesada(1000);
    }
}
usaVeiculo(v1);
usaVeiculo(v2);

//Discriminated Unions
interface Passaro {
    tipo: 'passaro';
    velocidadeVoo: number;
}

interface Cavalo {
    tipo: 'cavalo';
    velocidadeCorrida: number;
}

type Animal = Passaro | Cavalo;

function moveAnimal(animal: Animal) {
    //instanceof não funciona aqui por usarmos interface
    let velocidade;
    switch (animal.tipo) {
        case 'passaro':
            velocidade = animal.velocidadeVoo;
            break;
        case 'cavalo':
            velocidade = animal.velocidadeCorrida;
    }
    console.log('Move-se com velocidade: ' + velocidade);
}

moveAnimal({tipo: 'passaro', velocidadeVoo: 20});

//Type Casting
//const paragrafo = document.querySelector('p');
//const paragrafo = document.getElementById('message-output');
//HTMLInputElement reconhece const como não nulo e value
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input');
userInputElement1.value = 'Oioioi!!';

const userInputElement2 = document.getElementById('user-input') as HTMLInputElement;
userInputElement2.value = 'Hihihi!!';

const userInputElement3 = document.getElementById('user-input');
if (userInputElement3) {
    (userInputElement3 as HTMLInputElement).value = "holaaa";
}