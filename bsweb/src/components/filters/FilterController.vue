<template>
  <div>
    <input type="checkbox" :value="filter.id" v-model="isActive" />
    <label class="filter-name">{{ $t(filter.filter_name) }}</label>
    <div v-if="isActive">
      <div class="options">
        <FilterFormField :filter="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FilterFormField from './FilterFormField'

export default {
  components: {
    FilterFormField,
  },
  props: ['filter'],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'resetData',
      'resetMapResource',
      'filterData',
    ]),
  },
  watch: {
    isActive: function(val) {
      if (val) {
        this.addActiveFilter(this.filter);
      } else {
        this.removeActiveFilter(this.filter);
        this.resetData();
        this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
        this.filterData();
      }
    }
  }
}
</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }
  input {
    cursor: pointer;
  }
  .options {
    margin: 0 0 10px 20px;
    font-size: 12px;
  }
</style>