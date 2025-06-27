<template>
  <div>
    <router-link to="/">Voltar</router-link>
    <Chart
    :size="{ width: 500, height: 400 }"
    :data="chartData"
    :margin="margin"
    :direction="direction">
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['HOUR', 'value']" />
      </template>
    </Chart>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { Chart, Grid, Line } from 'vue3-charts';

const store = useStore();

const chartData = computed(() => store.state.bikesp.data);

const direction = ref('horizontal');
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});

onMounted(() => {
  store.dispatch('bikesp/updateData');
});
</script>

<style scoped>
#app {
  color: #2ecc71
}
</style>