<template>
  <div class="controls-container">
    <BikeSPDataTypeInput />
    <BikeSPAggregationInput />
    <div class="button-wrapper">
      <button @click="apply" class="apply-button">Aplicar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import BikeSPAggregationInput from './BikeSPAggregationInput.vue';
import BikeSPDataTypeInput from './BikeSPDataTypeInput.vue';
import { useStore } from 'vuex';

const store = useStore();

const apply = () => {
  store.dispatch('bikesp/updateData');
};

onMounted(() => {
    store.dispatch('bikesp/updateData');
})
</script>

<style scoped>
.controls-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: sans-serif;
}

.button-wrapper {
  text-align: center;
}

.apply-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.apply-button:hover {
  background-color: #0056b3;
}
</style>
