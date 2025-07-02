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
import { config, aggregationConfig } from './BikeSPChartConfig';
import merge from 'lodash/merge';

const store = useStore()

const computedConfig = computed(() => {
    const newConfig = structuredClone(config);
    newConfig.chart.grid.labels.xAxisLabels.values = store.getters['bikesp/getBikespLabels'];
    const chartConfig = aggregationConfig[store.state.bikesp.activeFilters.aggregation];
    return merge(newConfig, chartConfig);
});

const dataset = computed(() => [
    {
        name: 'BikeSP',
        series: store.getters['bikesp/getBikespValues'],
        type: 'bar',
        shape: 'circle',
        useArea: false,
        useProgression: false,
        dataLabels: false,
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