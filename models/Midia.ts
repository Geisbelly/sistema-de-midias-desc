

/* eslint-disable @typescript-eslint/no-unused-vars */
export class horas {
    hora: number;
    minuto: number;
    constructor(hora: number, minuto: number){
        this.hora = hora;
        this.minuto = minuto;
    }
}

export class temporadas {
    qtTempotadas: number;
    
    constructor(qtTempotadas: number){
        this.qtTempotadas = qtTempotadas;
    }
}

export interface duracao {
    temporadas?: temporadas;
    horas?:horas;
}

  
  

export default abstract class Midia {
    private nome: string;
    private descricao: string;
    private genero: string;
    private ano: number;
    private avaliacao: number;
    


    constructor(nome: string, descricao: string, genero: string, ano: number) {
        this.nome = nome;
        this.descricao = descricao;
        this.genero = genero;
        this.ano = ano;
        this.avaliacao = 0;

    }



    getNome(){
        return this.nome;
    } 
    
    getDescricao(){
        return this.descricao;
    }

    getGenero(){
        return this.genero;
    }

    getAno(){
        return this.ano;
    }

    getAvaliacao(){
        return this.avaliacao;
    }

    setNome(nome: string){
        this.nome = nome;
    }

    setDescricao(desc: string){
        this.descricao = desc;
    }

    setGenero(g: string){
        this.genero = g;
    }

    setAno(ano: number){
        this.ano = ano;
    }

    setAvaliacao(n: number){
        this.avaliacao = n;
    }


    abstract getMidia(): { 'nome': string, 'descricao': string, 'genero':string, 'ano':number, 'avaliacao':number};



}