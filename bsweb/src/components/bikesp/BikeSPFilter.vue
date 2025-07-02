<template>
  <div class="filter-container">
    <div>
      <label for="filter-select">Adicionar filtro:</label>
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
                 :preserve-search="true" placeholder="Escolha um filtro" label="name" track-by="name" :preselect-first="false"
                 :taggable="true">
      </multiselect>
    </div>
    <div class="active-filters">
      <div v-for="filter in value" :key="filter.name" class="filter-wrapper">
        <component :is="filter.value" />
        <button class="remove-btn" @click="removeFilter(filter)" title="Remover filtro">
          &minus;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BikeSPGenderFilter from './filters/BikeSPGenderFilter.vue';
import BikeSPRaceFilter from './filters/BikeSPRaceFilter.vue';
import Multiselect from 'vue-multiselect';
import BikeSPDateFilter from './filters/BikeSPDateFilter.vue';

const value = ref([])

const options = [
  {name: 'Gênero', value: BikeSPGenderFilter},
  {name: 'Etnia', value: BikeSPRaceFilter},
  {name: 'Data', value: BikeSPDateFilter}
]

const removeFilter = (filter) => {
  value.value = value.value.filter(f => f !== filter)
}
</script>

<style>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fixed-width-multiselect {
  width: 100%;
}

.multiselect__content-wrapper {
  width: 100% !important; /* force the dropdown to match */
  min-width: 100% !important;
  box-sizing: border-box;
}

.active-filters > * {
  margin-top: 12px;
}

.active-filters:has(label) {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.remove-btn {
  float: right;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.filter-wrapper > select {
  font-size: 13px;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.filter-wrapper > label {
  margin-right: auto;
  font-size: 13px;
}
</style>
