<template>
  <div v-show="count > 0">
    <b-checkbox v-model="isActive" :native-value="tier" type="is-info">
      {{ $t('tier') }} {{ tier+1 }} ({{ count }} {{ $tc('flow', count)}})
    </b-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: [
    'tier',
    'count',
  ],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    ...mapActions([
      'addToMap',
      'removeFromMap',
    ]),
  },
  computed: {
    flow() {
      return this.$store.state.filters.flows[this.tier];
    }
  },
  watch: {
    isActive: function(value) {
      const data = {
        mapkey: "main",
        category: "flows",
        type: "polyline",
        key: this.tier
      };
      if (value) {
        this.addToMap(data);
      } else {
        this.removeFromMap(data);
      }
    },
    flow() {
      if (this.isActive) {
        this.addToMap({
          mapkey: "main",
          category: "flows",
          type: "polyline",
          key: this.tier
        });
      }
    }
  }
}
</script>
