<template>
  <div>
    <span class="category-name" @click="toggleCategory">{{ $t(category.category_name) }}</span>
    <div v-if="isCategoryActive">
      <div v-for="filter in category.filters" :key="filter.id">
        <input type="checkbox" :id="filter.id" :value="filter.filter_key" v-model="checkedFilters">
        <label for="filter.id" class="filter-name">{{ $t(filter.filter_name) }}</label>
        <div v-if="checkedFilters.includes(filter.filter_key)" class="options">
          Opções do filtro {{ $t(filter.filter_name) }}
          <FilterFormField :filter="filter" />
        </div>
      </div>
      <div>{{ checkedFilters }}</div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import * as style from '../../store/helpers/style_layers';
  import * as options from '../../store/helpers/option_helpers';

  export default {
    props: ["category"],
    components: {
    },
    data() {
      return {
        checkedFilters: [],
        isCategoryActive: false,
      }
    }
  }
</script>

<style scoped>
  .category-name {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
  .filter-name {
    font-size: 12px;
    font-weight: normal;
    color: #666;
    margin: 0 5px;
  }
  .options {
    margin-left: 20px;
  }
</style>