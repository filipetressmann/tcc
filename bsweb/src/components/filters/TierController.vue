<template>
  <div v-show="count > 0">
    <b-checkbox v-model="isActive" :native-value="tier" type="is-info">
      <span class="tier-option">{{ $t('tier') }} {{ tier+1 }} ({{ count }} {{ $tc('flow', count) }})</span>
    </b-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    tier: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    flow() {
      return this.$store.state.filters.flows[this.tier];
    },
  },
  watch: {
    isActive: function(value) {
      const data = {
        mapkey: 'main',
        category: 'flows',
        type: 'polyline',
        key: this.tier,
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
          mapkey: 'main',
          category: 'flows',
          type: 'polyline',
          key: this.tier,
        });
      }
    },
  },
  methods: {
    ...mapActions([
      'addToMap',
      'removeFromMap'
    ]),
  },
};
</script>

<style scoped>
  .tier-option {
    font-size: 12px;
  }
</style>