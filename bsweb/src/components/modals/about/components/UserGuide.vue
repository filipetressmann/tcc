<template>
  <div>
    <h2>Guia do usuário</h2>
    <article>
      <h3>Fluxos</h3>
      <p>
        Os fluxos são arcos que representam conjuntos de viagens de bicicleta saindo de uma área de origem e apontando para uma área de destino.
        Quanto maior a quantidade de viagens que um fluxo representa, maior é a sua espessura.
        Para simplificação dos cálculos, nós desconsideramos fluxos com origem e destino na mesma área.
        Por isso os fluxos dependem da forma que dividimos o mapa.
        Quanto menores as áreas, mais fluxos são gerados, o que pode dificultar a visualização, mas permite análises mais detalhadas.
      </p>
    </article>
    <article>
      <h3>Camada de visualização</h3>
      <span>Define a forma geométrica das áreas de divisão do mapa:</span>
      <ul>
        <li><strong>Grid: </strong>retângulos personalizáveis.</li>
        <li><strong>Zonas OD: </strong>são as zonas utilizadas na pesquisa Origem e Destino 2017 do Metrô de São Paulo.</li>
      </ul>
    </article>
    <article>
      <h3>Edição do grid</h3>
      <p>
        Altera as configurações do grid. O tamanho define em quantos retângulos vamos dividir o grid, por exemplo, o tamanho 10 divide o grid
        em 10x10 retângulos. Os demais parâmetros definem os extremos de cada direção do grid.
      </p>
      <p>Após alterar o grid é necessário recalcular os fluxos.</p>
    </article>
    <article>
      <h3>Filtros</h3>
      <p>
        Um filtro permite visualizar uma fração das viagens para analisar o comportamento de um sub-conjunto das viagens.
        Por exemplo, se quisermos comparar as viagens de manhã, quando as pessoas estão indo trabalhar, com as viagens à noite, na volta
        para casa, podemos utilizar o filtro "Horário de início".
      </p>
      <p>Para ativar um filtro basta selecioná-lo e eles serão aplicados automaticamente nos fluxos.</p>
    </article>
    <article>
      <h3>Camadas</h3>
      <p>
        As camadas permitem visualizar linhas e estações de metrô e trem, a infraestrutura cicloviária e outros itens, como os acidentes
        envolvendo bicicletas.
      </p>
      <p>Para ativar uma camada basta selecioná-la.</p>
    </article>
  </div>
</template>

<script>
export default {
    
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
</style>