<template>
  <div class="layout-container">
    <BikeSPForm class="form-panel" />
    <div class="chart-panel">
      <BikeSPChart />
    </div>
  </div>
</template>

<script setup>
import BikeSPChart from '../components/charts/BikeSPChart.vue';
import BikeSPForm from '../components/filters/bikesp/BikeSPForm.vue';
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 16px;
  height: 80vh; /* or 100vh minus header etc */
}

.form-panel {
  flex: 0 0 320px;
  max-width: 320px;
  overflow-y: auto;
  height: 80vh;
}

.chart-panel {
  flex: 1;
  min-width: 0;
  height: 80vh; /* match container height */
  /* Make sure child uses full height */
  display: flex;
  flex-direction: column;
}

/* Optional: make chart fill its container */
.chart-panel > * {
  flex-grow: 1;
  width: 100%;
}
</style>
