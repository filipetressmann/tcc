<template>
  <label>Gênero:</label>
  <div class="select-button-wrapper">
    <select v-model="g" @change="changeGender">
      <option value="M">Masculino</option>
      <option value="F">Feminino</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const g = ref('');

const changeGender = () => {
    store.commit('bikesp/updateFilters', { gender: g})
}

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { gender: undefined });
});
</script>
