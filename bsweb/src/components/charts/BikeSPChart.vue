<template>
    <div class="chart-wrapper">
        <VueUiXy
            :config="computedConfig"
            :dataset="dataset"
        />
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { VueUiXy } from "vue-data-ui";
import "vue-data-ui/style.css";
import { useStore } from 'vuex';
import { config } from './BikeSPChartConfig';

const store = useStore()

const computedConfig = computed(() => {
    const newConfig = structuredClone(config);
    newConfig.chart.grid.labels.xAxisLabels.values = store.getters['bikesp/getBikespLabels'];
    return newConfig
});

const dataset = computed(() => [
    {
        name: 'BikeSP Data',
        series: store.getters['bikesp/getBikespValues'],
        color: '#1f77b4',
        type: 'bar',
        shape: 'circle',
        useArea: false,
        useProgression: false,
        dataLabels: true,
        smooth: true,
        dashed: false,
        useTag: 'none'
    }
]);
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
}
</style>