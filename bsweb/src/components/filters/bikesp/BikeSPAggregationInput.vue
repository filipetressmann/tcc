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
    </select>
    <p class="helper-text">
      Escolha uma categoria para agrupar os dados exibidos no gráfico.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selected = ref('HOUR');

const onChange = (e) => {
  store.commit('bikesp/updateAggregation', e.target.value);
};
</script>

<style scoped>
.aggregation-selector {
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
