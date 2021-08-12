<template>
  <div>
    <h2>Funcionalidades</h2>
    <p>As funcionalidades da ferramenta estão organizadas em três grupos:</p>
    <ol>
      <li>
        <strong>Fluxos:</strong> contém as opções para definir e ajustar a grade na qual os fluxos serão computados. Os fluxos são organizados em 4 quartis, cada um deles responsável por 25% do total de viagens. O primeiro quartil contém os fluxos mais intensos, ou seja, poucos fluxos mas cada um contendo muitas viagens, e assim por diante até o último quartil, que tem muitos fluxos, mas cada um com poucas viagens.
      </li>
      <li>
        <strong>Filtros:</strong> contém opções de filtros temporais, de condições de viagens e demográficos a serem aplicados nos fluxos. Ao selecionar uma categoria de filtros aparecem suas opções, que quando ativadas, filtram automaticamente os fluxos.
      </li>
      <li>
        <strong>Camadas:</strong> contém opções de visualização de camadas de infraestrutura de transporte, cicloviária e de ocorrências de trânsito.
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    
  }
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
  p {
    text-align: justify;
    margin-bottom: 20px;
  }
  li {
    text-align: justify;
  }
</style>