<template>
  <div class="category-wrapper">
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isActive }]"/>
      <h3 class="category-name">{{ $t(category.category_name) }}</h3>
    </div>
    <div v-show="isActive" class="category-options">
      <div v-for="filter in category.filters" :key="filter.id">
        <FilterController
          :filter="filter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FilterController from './FilterController.vue';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

export default {
  components: {
    FilterController
  },
  props: ['category'],
  data() {
    return {
      isActive: false,
      iconArrow,
    }
  },
  computed: {
    ...mapGetters(['allFilters']),
  },
  methods: {
    toggleCategory() {
      this.isActive = !this.isActive
    },
  }
}

</script>

<style scoped>
  .category-wrapper{
    margin-bottom: 10px;
  }

  .category-toggle {
    cursor: pointer;
    display: flex;
  }

  .category-options {
    margin-left: 8px;
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