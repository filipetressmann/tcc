<template>
  <div>
    <div v-if="$i18n.locale == 'pt-br'">
      <h2>Funcionalidades</h2>
      <p>As funcionalidades da ferramenta estão organizadas em três grupos:</p>
      <ol>
        <li>
          <strong>Fluxos:</strong> contém as opções para definir e ajustar a
          grade na qual os fluxos serão computados. Os fluxos são organizados em
          4 quartis, cada um deles responsável por 25% do total de viagens. O
          primeiro quartil contém os fluxos mais intensos, ou seja, poucos
          fluxos mas cada um contendo muitas viagens, e assim por diante até o
          último quartil, que tem muitos fluxos, mas cada um com poucas viagens.
        </li>
        <li>
          <strong>Filtros:</strong> contém opções de filtros temporais, de
          condições de viagens e demográficos a serem aplicados nos fluxos. Ao
          selecionar uma categoria de filtros aparecem suas opções, que quando
          ativadas, filtram automaticamente os fluxos.
        </li>
        <li>
          <strong>Camadas:</strong> contém opções de visualização de camadas de
          infraestrutura de transporte, cicloviária e de ocorrências de
          trânsito.
        </li>
      </ol>
    </div>
    <div v-else-if="$i18n.locale == 'en'">
      <h2>Features</h2>
      <p>The tool features are divided in three groups:</p>
      <ol>
        <li>
          <strong>Flows:</strong> includes options for defining and adjusting
          the map grid in which the flows will be calculated. The flows are
          divided in 4 quartiles, each one of them containing 25% of the total
          trip count. The first quartile contains the flows representing most of
          the trips, that is a few flows with most of the trips. The last
          quartile contains many flows, each one of them with just a few trips.
        </li>
        <li>
          <strong>Filters:</strong> includes options of time filters, trip
          conditions and demographic filters to be applied on the flows. By
          selecting a filter category it's options are shown. When an option is
          activated the flows are automatically filtered.
        </li>
        <li>
          <strong>Layers:</strong> includes visual layers options for
          tranportation infrastructure, cycling infrastructure e traffic
          accidents.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
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