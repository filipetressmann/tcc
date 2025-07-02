<template>
  <div class="date-filter-container">
    <label class="field-label">Data:</label>
    <div class="date-input-row">
      <input type="date" v-model="from" @change="updateFilter" />
      <span class="separator">–</span>
      <input type="date" v-model="to" @change="updateFilter" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const from = ref('');
const to = ref('');

const updateFilter = () => {
  store.commit('bikesp/updateFilters', {
    from: from.value || undefined,
    to: to.value || undefined
  });
};

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', {
    from: undefined,
    to: undefined
  });
});
</script>

<style scoped>
.date-filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.field-label {
  font-weight: bold;
  font-size: 14px;
}

.date-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="date"] {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.separator {
  font-size: 16px;
  color: #666;
}
</style>
