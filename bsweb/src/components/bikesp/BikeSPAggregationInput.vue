<template>
  <div class="aggregation-selector">
    <label for="aggregation-select">Agrupar dados por:</label>
    <select
      id="aggregation-select"
      v-model="selected"
      @change="onChange"
    >
      <option value="GENDER">Gênero</option>
      <option value="RACE">Raça</option>
      <option value="WEEK">Semana</option>
      <option value="HOUR">Hora do dia</option>
      <option value="DAY_OF_WEEK">Dia da semana</option>
      <option value="PAYOUT_LEVEL">Recompensa (R$/Km)</option>
    </select>
    <p class="helper-text">
      Escolha uma categoria para agrupar os dados exibidos no gráfico.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selected = ref('HOUR');

const onChange = (e) => {
  store.commit('bikesp/updateAggregation', selected.value);
};

onMounted(() => {
  store.commit('bikesp/updateAggregation', selected.value);
});

onBeforeUnmount(() => {
  store.commit('bikesp/updateAggregation', undefined);
});
</script>
