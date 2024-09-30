import  { temporadas } from "./Midia";
import Midia from "./Midia";

export default class Serie extends Midia{
    private duracao: temporadas;

    constructor(nome: string, descricao: string, genero: string, ano: number, duracao: temporadas) {
        super(nome, descricao, genero, ano);
        this.duracao = duracao;
        
    }

    getDuracao(): temporadas {
       return this.duracao;
        
    }

    setDuracao(n: number){
        this.duracao.qtTempotadas = n;
    }
    
    getMidia(): { "nome": string; "descricao": string; "genero": string; "ano": number; "avaliacao": number; "duracao":number } {
        return{ 'nome': this.getNome(), 'descricao':this.getDescricao(),
            'genero':this.getGenero(), 'ano':this.getAno(), 
            'avaliacao':this.getAvaliacao(), 'duracao':this.duracao.qtTempotadas
        }
    }

}