<template>
  <div>
    <h2>Guia do usuário</h2>
    <article>
      <h3>Fluxos</h3>
      <div class="content-wrapper">
        <div>
          <p>
            Os fluxos são arcos que representam conjuntos de viagens de bicicleta
            saindo de uma área de origem e apontando para uma área de destino.
            Quanto maior a quantidade de viagens que um fluxo representa, maior é a
            sua espessura.
          </p>
          <p>
            Para simplificação dos cálculos, nós desconsideramos
            fluxos com origem e destino na mesma área. Por isso os fluxos dependem
            da forma que dividimos o mapa. Quanto menores as áreas, mais fluxos são
            gerados, o que pode dificultar a visualização, mas permite análises mais
            detalhadas.
          </p>
          <div class="img-container center">
            <div class="img">
              <img :src="flowImg">
              <span class="img-title">Grid</span>
            </div>
          </div>
        </div>
      </div>
    </article>
    <article>
      <h3>Camada de visualização</h3>
      <span>Define a forma geométrica das áreas de divisão do mapa:</span>
      <ul>
        <li><strong>Grid: </strong>retângulos personalizáveis.</li>
        <li>
          <strong>Zonas OD: </strong>são as zonas utilizadas na pesquisa Origem
          e Destino 2017 do Metrô de São Paulo.
        </li>
      </ul>
      <div class="img-container center">
        <div class="img">
          <img :src="gridImg">
          <span class="img-title">Grid</span>
        </div>
        
        <div class="img">
          <img :src="zonesImg">
          <span class="img-title">Zonas OD</span>
        </div>
      </div>
    </article>
    <article>
      <h3>Edição do grid</h3>
      <p>
        Altera as configurações do grid. O tamanho define em quantos retângulos
        vamos dividir o grid, por exemplo, o tamanho 10 divide o grid em 10x10
        retângulos. Os demais parâmetros definem os extremos de cada direção do
        grid.
      </p>
      <p>Após alterar o grid é necessário recalcular os fluxos.</p>
      <div class="img-container center">
        <div class="img">
          <img :src="gridEditionImg">
          <span class="img-title">Zonas OD</span>
        </div>
      </div>
    </article>
    <article>
      <h3>Filtros</h3>
      <p>
        Um filtro permite visualizar uma fração das viagens para analisar o
        comportamento de um sub-conjunto delas.
      </p>
      <ol>
        <li>Selecione a aba <strong>Filtros</strong>.</li>
        <li>Selecione uma categoria de filtros</li>
        <li>Selecione um tipo de filtro</li>
        <li>Finalmente, selecione uma opção para ativar o filtro</li>
        <li>Para ativar um filtro basta selecioná-lo.</li>
        <li>Pronto, agora os fluxos são automaticamente atualizados. Note que a contagem de filtros aumentou.</li>
      </ol>
      <div class="img-container center">
        <div class="img">
          <img :src="filterImg">
        </div>
        <div class="img">
          <img :src="filterImg02">
        </div>
      </div>
      <div class="img-container center">
        <div class="img">
          <img :src="filterImg03">
        </div>
        <div class="img">
          <img :src="filterImg04">
        </div>
      </div>
    </article>
    <article>
      <h3>Camadas</h3>
      <p>
        As camadas permitem visualizar linhas e estações de metrô e trem, a
        infraestrutura cicloviária e outros itens, como os acidentes envolvendo
        bicicletas.
      </p>
      <ol>
        <li>
          Selecione a aba <strong>Camadas</strong>
        </li>
        <li>
          Seleciona uma categoria
        </li>
        <li>
          Selecione uma camada para ativá-la
        </li>
      </ol>
      <div class="img-container center">
        <div class="img">
          <img :src="layersImg">
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import flowImg from '@/assets/user-guide/flow.png';
import gridImg from '@/assets/user-guide/grid.png';
import zonesImg from '@/assets/user-guide/zones.png';
import gridEditionImg from '@/assets/user-guide/grid-edition.png';
import filterImg from '@/assets/user-guide/filter01.png';
import filterImg02 from '@/assets/user-guide/filter02.png';
import filterImg03 from '@/assets/user-guide/filter03.png';
import filterImg04 from '@/assets/user-guide/filter04.png';
import layersImg from '@/assets/user-guide/layers.png';

export default {
  data() {
    return {
      flowImg,
      gridImg,
      zonesImg,
      gridEditionImg,
      filterImg,
      filterImg02,
      filterImg03,
      filterImg04,
      layersImg,
    };
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 40px;
  text-align: left;
}
h3 {
  font-size: 18px;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  text-align: left;
  margin-bottom: 10px;
}
p {
  text-align: justify;
  margin-bottom: 20px;
}
article {
  margin-bottom: 20px;
}
ul {
  list-style-type: disc;
  list-style-position: inside;
}
ol {
  margin-left: 20px;
}

.content-wrapper {
  display: flex;
}

.content-wrapper > img {
  margin-left: 20px;
}

.img-container {
  justify-content: space-evenly;
  margin: 10px 0;
}

.img {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img > img {
  border: 1px solid #bbb;
  margin-bottom: 5px;
}

.img-title {
  font-size: 12px;
  color: #000;
}
</style>