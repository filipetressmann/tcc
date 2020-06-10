<template>
  <div>
    <p class="label">Selecionar tiers:</p>
    <b-checkbox v-for="(count, index) in tierList" v-model="shownTiers" :native-value="index" :key="index" type="is-info">
      Tier {{ index+1 }} ({{ count }} fluxos)
    </b-checkbox>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        shownTiers: []
      };
    },
    methods: {
      ...mapActions([
        'addToMap',
        'removeFromMap',
        'resetMapResource'
      ]),
      resetTiers() {
        const resource = {
          mapkey: "main",
          category: "filters",
          type: "polyline"
        };
        this.resetMapResource(resource);
      }
    },
    computed: {
      tierList() {
        return this.$store.getters.tierList;
      }
    },
    watch: {
      shownTiers: function(value) {
        this.resetTiers();
        value.map(tier => {
          const data = {
            mapkey: "main",
            category: "filters",
            type: "polyline",
            key: tier
          };
          this.addToMap(data);
        })
      }
    }
  }
</script>
