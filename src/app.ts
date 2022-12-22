type Admin = {
    nome: string;
    privilegios: string[];
};

type Empregado = {
    nome: string;
    dataInicio: Date;
};

//interface EmpregadoElevado extends Empregado, Admin {}
type EmpregadoElevado = Admin & Empregado;

const e1: EmpregadoElevado = {
    nome: 'Alejandro',
    privilegios: ['cria-servidor'],
    dataInicio: new Date()
};

type Combinavel = string | number;
type Numerico = number | boolean;
type Universal = Combinavel & Numerico;