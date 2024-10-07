import  { horas } from "./Midia";
import Midia from "./Midia";

export default class Filme extends Midia{
    private duracao: horas;

    constructor(nome: string, descricao: string, genero: string, ano: number, duracao: horas) {
        super(nome, descricao, genero, ano);
        this.duracao = duracao;
    }

    getDuracao(): string {
       return `${this.duracao.hora}h  ${this.duracao.minuto}min`;
        
    }

    getDura(): horas{
        return this.duracao;
    }

    setDuracao(m: number, h: number){
        this.duracao.hora = m;
        this.duracao.minuto =h;
    }

    getMidia(): { "nome": string; "descricao": string; "genero": string; "ano": number; "avaliacao": number; "duracao":{"hora":number; "minuto":number} } {
        return{ 'nome': this.getNome(), 'descricao':this.getDescricao(),
            'genero':this.getGenero(), 'ano':this.getAno(), 
            'avaliacao':this.getAvaliacao(), 'duracao':{"hora":this.duracao.hora, "minuto":this.duracao.minuto}
        }
    }

}