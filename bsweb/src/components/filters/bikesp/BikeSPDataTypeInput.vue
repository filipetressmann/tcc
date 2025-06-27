<template>
  <div class="data-type-selector">
    <label for="data-type-select">Selecionar tipo de dado:</label>
    <select
      id="data-type-select"
      v-model="selected"
      @change="onChange"
    >
      <option value="TRIP_COUNT">Número de viagens</option>
      <option value="TRIP_DURATION">Duração das viagens</option>
      <option value="TRIP_DISTANCE">Distância percorrida</option>
    </select>
    <p class="helper-text">
      Escolha qual métrica você deseja visualizar no gráfico.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Optional: bind to current store state if needed
const selected = ref('TRIP_COUNT');

const onChange = (e) => {
  store.commit('bikesp/updateDataType', e.target.value);
};
</script>

<style scoped>
.data-type-selector {
  max-width: 400px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

select {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: border 0.2s ease;
}

select:focus {
  outline: none;
  border-color: #007bff;
  background-color: #fff;
}

.helper-text {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}
</style>
