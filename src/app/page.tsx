"use client";

import localStoreMidias from "../../models/localStoreMidias";
import Midia, { temporadas, horas } from "../../models/Midia";
import Filme from "../../models/Filme";
import Serie from "../../models/Serie";
import { useEffect, useRef, useState } from "react";
import  "../app/globals.css";


const Home: React.FC = () => {
  const loc = new localStoreMidias();

  const midiaRef = useRef<HTMLSelectElement>(null);
  const horaRef = useRef<HTMLSelectElement>(null);
  const minutosRef = useRef<HTMLSelectElement>(null);
  const qtTemporadasRef = useRef<HTMLSelectElement>(null);
  const [emAlteracao, setEmAlteracao] = useState<boolean>(false);
  const [globalsAltere, setGlobalsAltere] = useState<Midia>();
  const anoAtual = new Date().getFullYear()+100; 


  const salvar = () =>{
    if(emAlteracao){
      if(globalsAltere)
      alterarMidia(globalsAltere)
      setGlobalsAltere(undefined)
      setEmAlteracao(false)
      Limpar()
    }else{
      addMidiaF()

    }
  }


  useEffect(() => {
    const midia = midiaRef.current;

    if (midia) {
      midia.addEventListener('change', verificar);
    }

    verificar();
    gerarNum(1800, anoAtual, 'ano','Ano');
    gerarNum(0, 152, 'horas','Hora(s)');
    gerarNum(0, 59, 'minutos','Minutos');
    gerarNum(1, 100, 'temporadas','Temporadas');
    atualizarLista();
    Limpar()

  }, []);



  const gerarNum = (inicio: number, fim: number, elemento: string, textPlace: string) => {
    const selecion = document.getElementById(elemento) as HTMLSelectElement;

    // Criação do placeholder como uma opção não selecionável
    const ele1 = document.createElement('option');
    ele1.value = "";
    ele1.textContent = textPlace;  // Define o texto do placeholder
    ele1.disabled = true;            // Impede que o placeholder seja selecionado
    ele1.selected = true;            // Mostra o placeholder como a opção padrão
    ele1.hidden = true;              // Esconde o placeholder nas opções disponíveis
    selecion?.append(ele1);
    
    for (let i = inicio; i <= fim; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        option.id = i+" "+elemento
        if (selecion)
        selecion.appendChild(option);
      
    }
  }



  const verificar = () => {
    const midia = midiaRef.current;
    const hora = horaRef.current;
    const minutos = minutosRef.current;
    const qtTemporadas = qtTemporadasRef.current;

    if (midia && hora && minutos && qtTemporadas) {
      const m = midia.value;
      if (m === 'filme') {
        qtTemporadas.style.display = 'none';
        hora.style.display = 'block';
        minutos.style.display = 'block';
      } else {
        qtTemporadas.style.display = 'block';
        hora.style.display = 'none';
        minutos.style.display = 'none';
      }
    }
  };



  const addMidiaF = () => {
    const nome = document.getElementById('nome') as HTMLInputElement;
    const desc = document.getElementById('descricao') as HTMLInputElement;
    const ano = document.getElementById('ano') as HTMLInputElement;
    const genero = document.getElementById('genero') as HTMLInputElement;

    const midia = midiaRef.current;
    const hora = horaRef.current;
    const minutos = minutosRef.current;
    const qtTemporadas = qtTemporadasRef.current;

    if (midia && nome && desc && ano && genero) {
      if (midia.value === 'filme') {

        const midi: Filme = new Filme(nome.value, desc.value, genero.value,
        parseInt(ano.value),new horas(parseInt(hora?.value || "0"), parseInt(minutos?.value || "0")));


        loc.addMidia(midi);
        criarElemento(midi);
        

      } 
      else {
        const midi: Serie = new Serie(nome.value,desc.value,genero.value,
          parseInt(ano.value),new temporadas(parseInt(qtTemporadas?.value || "0"))
        );
          loc.addMidia(midi);
          criarElemento(midi);

      }
    }
    Limpar()
    
    
  }
  

  const criarElemento = (f: Midia) =>{
      //Elemento principal
      const elementoMidia = document.createElement('li');

      const divTipo = document.createElement('div');
      const divDados = document.createElement('div');
      const divCabecalho = document.createElement('div');
      const divBotoes = document.createElement('div');
      const divAvaliacoes = document.createElement('div');
      divTipo.id = 'tipo';
      divAvaliacoes.id = 'avaliacaoDiv';
      divBotoes.id = 'botoes';
      divDados.id = 'dados';
      divCabecalho.id = 'cabecalho'

      //Valores
      const titulo = document.createElement('h3');
      const tipo = document.createElement('p');
      const descricao = document.createElement('p');
      const dadosMais = document.createElement('p');

      titulo.id = `${f.getNome()}`;
      titulo.textContent = f.getNome();
      

      descricao.id = 'sinopse';
      descricao.textContent = f.getDescricao();

      dadosMais.id = 'more';

      if (f instanceof Filme){
        tipo.id = 'tipoFilme';
        tipo.textContent = "Filme";
        divTipo.appendChild(tipo);

        dadosMais.textContent = `${f.getAno()}   |    ${f.getGenero()}    |    ${f.getDura().hora}h ${f.getDura().minuto}min`;
        divDados.appendChild(dadosMais);
        divDados.appendChild(descricao);
        
      } else if (f instanceof Serie){
        tipo.id = 'tipoSerie';
        tipo.textContent = 'Série';
        divTipo.appendChild(tipo);

        dadosMais.textContent = `${f.getAno()}    |    ${f.getGenero()}   |    temporadas: ${f.getDuracao().qtTempotadas}`;
        divDados.appendChild(dadosMais);
        divDados.appendChild(descricao);

      }
      divTipo.appendChild(titulo);

      //Botões
      criarBotaoEditar(f, divBotoes);
      criarBotaoExcluirMidia(f, divBotoes);
      divDados.appendChild(divBotoes)

      // Criação das estrelas
      criarEstrelas(f, divAvaliacoes);

      //Adicionando no li
      divCabecalho.appendChild(divTipo)
      divCabecalho.appendChild(divAvaliacoes)
      elementoMidia.appendChild(divCabecalho)
      elementoMidia.appendChild(divDados)


      document.getElementById('midias')?.appendChild(elementoMidia)

  }



  const Limpar = () => {
    const nome = document.getElementById('nome') as HTMLInputElement;
    const desc = document.getElementById('descricao') as HTMLInputElement;
    const ano = document.getElementById('ano') as HTMLSelectElement;
    const genero = document.getElementById('genero') as HTMLInputElement;

    const h = horaRef.current;
    const m = minutosRef.current;
    const t = qtTemporadasRef.current;
    if(h && m) {
      h.selectedIndex = 0;
      m.selectedIndex = 0;
      
    }
    if (t){
      t.selectedIndex = 0;
    }

    nome.value = '';
    desc.value = '';
    ano.selectedIndex = 0;
    genero.value ='';


  }


  const alterarMidia = (f: Midia) => {
    const nome = document.getElementById('nome') as HTMLInputElement;
    const desc = document.getElementById('descricao') as HTMLInputElement;
    const ano = document.getElementById('ano') as HTMLSelectElement;
    const genero = document.getElementById('genero') as HTMLInputElement;


    const hora = horaRef.current;
    const minutos = minutosRef.current;
    const qtTemporadas = qtTemporadasRef.current;

    const midias = loc.getMidiaArray();
    const midi = midias.find(m => m.getNome() == f.getNome());
    if (midi){ 
      midi.setNome(nome.value);
      midi.setAno(parseInt(ano.value));
      midi.setDescricao(desc.value);
      midi.setGenero(genero.value);

      if(midi instanceof Filme){
        const hor = new horas(parseInt(hora?.value || "0"),parseInt(minutos?.value || "0"))

      midi.setDuracao(hor.hora,hor.minuto);
      } else if (midi instanceof Serie){
        midi.setDuracao((new temporadas(parseInt(qtTemporadas?.value || "0"))).qtTempotadas);
      }
      loc.setMidiaArray(midias)
      console.info(midias)
      console.info(loc.getMidiaArray())

      atualizarLista();
      return true;
    };
    return false;
    
  }


  const criarBotaoExcluirMidia = (f: Midia, parentElement: HTMLElement) => {
    const botao = document.createElement('button');
    botao.id = 'excluirBotao'
    botao.textContent = 'Excluir'

    botao.addEventListener( 'click', () =>{
      excluirMidia(f)
    })
    parentElement.appendChild(botao);
  }


  const excluirMidia = (f: Midia) => {
    loc.setMidiaArray(loc.getMidiaArray().filter(m => m != f));
    atualizarLista();
  }


  const editarMidia = (f: Midia) => {
    const nome = document.getElementById('nome') as HTMLInputElement;
    const desc = document.getElementById('descricao') as HTMLInputElement;
    const ano = document.getElementById('ano') as HTMLSelectElement;
    const genero = document.getElementById('genero') as HTMLSelectElement;
    const midia = midiaRef.current;
    const hora = horaRef.current;
    const minutos = minutosRef.current;
    const qtTemporadas = qtTemporadasRef.current;
  
    if (nome && desc && ano && genero && midia) {
      nome.value = f.getNome();
      desc.value = f.getDescricao();
      ano.value = f.getAno()+"";
      genero.value = f.getGenero();

      verificar(); 
      if (f instanceof Filme && hora && minutos) {
        midia.value = 'filme';
        hora.value = f.getDura().hora.toString();
        minutos.value = f.getDura().minuto.toString();
        
      } else if (f instanceof Serie && qtTemporadas) {
        midia.value = 'serie';
        qtTemporadas.value = f.getDuracao().qtTempotadas.toString();

      }
    }
    
  
  };


  const criarBotaoEditar = (f: Midia, parentElement: HTMLElement) =>{
      const botao = document.createElement('button');
      botao.id = 'editarBotao';
      botao.textContent = 'Editar'

      botao.addEventListener('click', () =>{
       
        editarMidia(f);
        setEmAlteracao(true)
        setGlobalsAltere(f)
        verificar()
      
      })

      parentElement.appendChild(botao);
  }


  const criarEstrelas = (f: Midia, parentElement: HTMLElement) => {
      const ava = document.createElement('div');
      ava.id = 'avaliacao';
    
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'estrela';
        star.dataset.value = i.toString();
        star.textContent = '★';
        star.style.cursor = 'pointer';
        if (i<= f.getAvaliacao()){
          star.classList.add('selected');
        }  
        ava.appendChild(star);
        
        star.addEventListener('click', function () {
          const valor = parseInt(this.dataset.value || "0");
          const estrelas = ava.querySelectorAll('.estrela');
    
          estrelas.forEach((estrela) => {
            const estrelaValor = parseInt(estrela.getAttribute('data-value') || "0");
            
            if (estrelaValor <= valor) {
              estrela.classList.add('selected');
              f.setAvaliacao(estrelaValor)
              const midias = loc.getMidiaArray();
              const midiaIndex = midias.findIndex((m) => m.getNome() === f.getNome());
              if (midiaIndex !== -1) {
                midias[midiaIndex].setAvaliacao(estrelaValor);
                atualizarLista();
              }
            } else {
              estrela.classList.remove('selected');
            }
          });

        });

        star.addEventListener('mouseover', function () {
          const valor = parseInt(this.dataset.value || "0");
          const estrelas = ava.querySelectorAll('.estrela');
    
          estrelas.forEach((estrela) => {
            const estrelaValor = parseInt(estrela.getAttribute('data-value') || "0");
    
            if (estrelaValor <= valor) {
              estrela.classList.add('up');
            } else {
              estrela.classList.remove('up');
            }
          });

        });
        star.addEventListener('mouseout', function (){
          const estrelas = ava.querySelectorAll('.estrela');

          estrelas.forEach((estrela)=>{
            estrela.classList.remove('up');
          })
        })

        

      }

       
        
       
    
      parentElement.appendChild(ava);
  };
  

  const atualizarLista = () =>{
    loc.initializeLocalStorage()
      const listaMidias = document.getElementById('midias');
      if (listaMidias)
      listaMidias.innerHTML = " ";
        
      loc.getMidiaArray().forEach( f => {
          criarElemento(f);

      } )
  }



  return (
    <main>
    <div id="form">
      <h3>Produção de Midia</h3>
      <div id="nomeGenero">
      <input type="text" id="nome" name="nome" placeholder="Título da Produção" />
      <input type="text" id="genero" name="genero" placeholder="Gênero da Produção" />
      </div>

      <div id="seleções">
      <div id="anoMidia">
      <select id="ano" name="ano"  required></select>
      <select id="midia" name="midia" ref={midiaRef}>
        <option value="serie">Série</option>
        <option value="filme">Filme</option>
      </select>
      </div>

      <div id='tempoforfilme'>
      <select
        id="horas"
        name="horas"
        style={{ display: 'none' }}
        ref={horaRef}
      ></select>

      <select
        id="minutos"
        name="minutos"
        style={{ display: 'none' }}
        ref={minutosRef}
      ></select>
      </div>

      <div id='tempoforserie'>
      <select
        id="temporadas"
        name="temporadas"
        style={{ display: 'none' }}
        ref={qtTemporadasRef}
      ></select>
      </div>
      </div>

      <textarea id="descricao" name="descricao" placeholder="Descrição da Produção" />

      <div id="botoes">
      <button id= 'salvar' onClick={salvar}>Salvar</button>
      <button onClick={Limpar} id="cancelar">Cancelar</button>
      </div>
    </div>
    <div>
      <ul id='midias'>
        
      </ul>
    </div>
    </main>
  );
}



export default Home;
