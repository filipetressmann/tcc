<template>
  <div class="category-name" @click="toggleCategory">
    {{ $t(category.category_name) }}
    <div v-for="filter in category.filters" :key="filter.id">
      <FilterHandlerV2
        :filter="filter"
        :type="'filter'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FilterHandlerV2 from './FilterHandlerV2.vue';

export default {
  components: {
    FilterHandlerV2
  },
  props: ['category'],
  data() {
    return {
      checkboxes: []
    }
  },
  computed: {
    ...mapGetters(['allFilters']),
    // changes() {
    //   const tmp = this.checkboxes.map(f => f.id);
    //   console.log('tmp', tmp);
    //   debugger;
    //   return this.checkboxes.map(f => f.id);
    // }
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
    ]),
    toggleCategory() {
      this.isActive = !this.isActive
      // console.log(this.checkboxes);
      // Adicionar categoria (layer ou filtro)
    },
    // selectResource(resource) {
    //   let category = this.category.category_name;
    //   if (category == "layers") {
    //     this.addActiveLayer(resource);
    //   } else {
    //     this.addActiveFilter(resource);
    //   }
    // },
  },
  watch: {
    // changes: {
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     debugger;
    //     if (newVal.length > oldVal.length) { // Filtro adicionado
    //       const filter_id = newVal.pop();
    //       console.log("add", filter_id);
    //     } else if (newVal.length < oldVal.length) { // filtro removido
    //       console.log('removido?')
    //     }
    //   }
    // }
    // checkboxes: {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     console.log('new', newValue);
    //     console.log('old', oldValue);
    //     debugger;
    //     // if (filters.length > 0) {
    //     //   this.addActiveFilter(filters.pop());
    //     // }
    //   }
    // },
  }
}

</script>

<style scoped>
</style>