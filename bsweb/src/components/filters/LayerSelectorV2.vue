<template>
  <div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['category'],
  computed: {
    ...mapGetters([
      'allLayers',
      'activeLayers'
    ]),
  },
  methods: {
    toggleCategory() {
      this.isActive = !this.isActive
      // Adicionar categoria (layer ou filtro)
    },
    selectResource(resource) {
      let category = this.category.category_name;
      debugger;
      // if (category == "layers") {
      //   this.addActiveLayer(resource);
      // } else {
      //   this.addActiveFilter(resource);
      // }
    },
  }
}
// methods: {
//       ...mapMutations([
//         'addActiveFilter',
//         'removeActiveFilter',
//         'addActiveLayer',
//         'removeActiveLayer',
//         'resetMapResource',
//         'removeFromMap'
//       ]),
//       selectResource(resource) {
//         let category = this.category.category_name;
//         if (category == "layers") {
//           this.addActiveLayer(resource);
//         } else {
//           this.addActiveFilter(resource);
//         }
//       },
//       deselectResource(resource) {
//         let category = this.category.category_name;
//         if (category != "layers") category = "flows";
        
//         if (category == 'layers') {
//           this.removeFromMap({ mapkey: "main", category, type: resource.filter_type, key: resource.filter_key});
//           this.removeActiveLayer(resource);  
//         } else {
//           this.resetMapResource({ mapkey: "main", category, type: resource.filter_type });
//           this.removeActiveFilter(resource);
//         }
//       }
//     }

</script>



<style scoped>
</style>