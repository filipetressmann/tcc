<template>
  <div class="data-type-selector">
    <label for="data-type-select">Selecionar tipo de dado:</label>
    <select
      id="data-type-select"
      v-model="selected"
      @change="onChange"
    >
      <option
        v-for="option in currentOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p class="helper-text">
      Escolha qual métrica você deseja visualizar no gráfico.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selected = ref('TRIP_COUNT');

const isMapViewOn = computed(() => store.getters['bikesp/isMapViewOn'])

const chartOptions = [
  { value: 'TRIP_COUNT', label: 'Número de viagens' },
  { value: 'TRIP_DURATION', label: 'Duração das viagens' },
  { value: 'TRIP_DISTANCE', label: 'Distância percorrida' },
  { value: 'MEAN_SPEED', label: 'Velocidade média' },
];

const mapOptions = [
  { value: 'TOTAL_SAMPLES', label: 'Total de amostras' },
  { value: 'SAMPLE_MEAN_SPEED', label: 'Velocidade média (pontos)' },
];

const currentOptions = computed(() =>
  isMapViewOn.value ? mapOptions : chartOptions
);

const onChange = (e) => {
  store.commit('bikesp/updateDataType', selected.value);
};

// This is necessary to change the default select option when the visualization changes
watch(currentOptions, (options) => {
  if (options.length && !options.some(opt => opt.value === selected.value)) {
    selected.value = options[0].value;
    store.commit('bikesp/updateDataType', selected.value);
  }
}, { immediate: true });

onMounted(() => {
  store.commit('bikesp/updateDataType', selected.value);
});

onBeforeUnmount(() => {
  store.commit('bikesp/updateDataType', undefined);
});
</script>

