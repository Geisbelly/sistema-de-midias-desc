"use client";
import Midia, { horas, temporadas } from "./Midia";
import Filme from "./Filme";
import Serie from "./Serie";

export default class localStoreMidias {
    private Midia: Array<Midia>;

    constructor(...args: Midia[]) {
        this.Midia = args.length ? args : [];
        this.loadFromLocalStorage();
    }

    private loadFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const storedMidia = localStorage.getItem('Midia');
            if (storedMidia) {
                const parsedMidia = JSON.parse(storedMidia);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.Midia = parsedMidia.map((item: any) => {
                    if (item.duracao.hora !== undefined) {
                        const duracao = new horas(item.duracao.hora, item.duracao.minuto);
                        return new Filme(item.titulo, item.descricao, item.genero, item.ano, duracao);
                    } else if (item.duracao.qtTempotadas !== undefined) {
                        const duracao = new temporadas(item.duracao.qtTempotadas);
                        return new Serie(item.titulo, item.descricao, item.genero, item.ano, duracao);
                    }
                    return null;
                }).filter(Boolean); 
            }
        }
    }
    

    initializeLocalStorage() {
        this.updateLocalStorage();
    }

    getMidiaArray() {
        return this.Midia;
    }

    addMidia(midia: Midia) {
        this.Midia.push(midia);
        this.updateLocalStorage();
    }

    removerMidia(id: Midia) {
        this.Midia = this.Midia.filter(f => f.getNome() !== id.getNome());
        this.updateLocalStorage();
    }

    limparMidia() {
        this.Midia = [];
        this.updateLocalStorage();
    }

    setMidiaArray(m: Array<Midia>){
        this.Midia = m;
    }

    private updateLocalStorage() {
        if (typeof window !== 'undefined') {
            const MidiaData = this.Midia.map(m => {
                if(m instanceof Filme){
                return {
                titulo: m.getNome(),
                ano: m.getAno(),
                genero: m.getGenero(),
                descricao: m.getDescricao(),
                avaliacao: m.getAvaliacao(),
                duracao: m.getDura()
                }
            } else if (m instanceof Serie){
                return {
                    titulo: m.getNome(),
                    ano: m.getAno(),
                    genero: m.getGenero(),
                    descricao: m.getDescricao(),
                    avaliacao: m.getAvaliacao(),
                    duracao: m.getDuracao()
                    }
            }})
        localStorage.setItem('Midia', JSON.stringify(MidiaData));
        };
           
        
    }
    
}
