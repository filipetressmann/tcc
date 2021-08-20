<template>
  <div>
    <div v-if="filter.has_checkbox">
      <input
        v-if="filter.has_checkbox"
        v-model="isActive"
        type="checkbox"
        :value="filter.id"
      >
      <label class="filter-name">{{ $t(filter.filter_name) }}</label>
      <div v-if="isActive">
        <div class="options">
          <FilterFormField :filter="filter" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="filter-toggle" @click="toggleFilter">
        <img :src="iconArrow" :class="['arrow', { active: isActive }]">
      </div>
      <label class="filter-name">{{ $t(filter.filter_name) }}</label>
      <div v-show="isActive">
        <div class="options">
          <FilterFormField :filter="filter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FilterFormField from './FilterFormField';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

export default {
  components: {
    FilterFormField,
  },
  props: {
    filter: { type: Object, required: true },
  },
  data() {
    return {
      isActive: false,
      iconArrow,
    };
  },
  watch: {
    isActive: function(val) {
      if (this.filter.has_checkbox) {
        if (val) {
          this.addActiveFilter(this.filter);
        } else {
          this.removeActiveFilter(this.filter);
        }
      }
    },
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
    ]),
    toggleFilter() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-size: 12px;
  }
  .filter-toggle {
    cursor: pointer;
    display: inline;
  }
  input {
    cursor: pointer;
  }
  .options {
    margin: 0 0 10px 20px;
    font-size: 12px;
  }
  .arrow {
    transition: all ease-in-out 0.2s;
    transform: rotate(-90deg);
    width: 12px;
    margin-right: 4px;
  }
  .arrow.active {
    transform: none
  }
</style>