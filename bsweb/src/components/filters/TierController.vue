<template>
  <div v-show="count > 0">
    <b-checkbox v-model="isActive" :native-value="tier" type="is-info">
      <span class="tier-option" :title="hover">{{ $t('tier') }} {{ tier+1 }} ({{ count }} {{ $tc('flow', count) }})</span>
    </b-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    tier: { type: Number, required: true },
    count: { type: Number, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters('flows', ['flows', 'selectors', 'flowsLimits']),
    flow() {
      return this.flows[this.mapkey][this.tier];
    },
    isActive: {
      get() {
        return this.selectors[this.mapkey][this.tier];
      },
      set() {
        this.toggleSelector({ mapkey: this.mapkey, tier: this.tier });
      },
    },
    hover() {
      if (this.flowsLimits[this.mapkey][this.tier]) {
        const min = Math.round(this.flowsLimits[this.mapkey][this.tier].min);
        const max = Math.round(this.flowsLimits[this.mapkey][this.tier].max);
        return `Fluxos contendo entre ${min} e ${max} viagens`;
      }
      return null;
    },
  },
  watch: {
    isActive(value) {
      const data = {
        mapkey: this.mapkey,
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
          mapkey: this.mapkey,
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
      'removeFromMap',
    ]),
    ...mapActions('flows', ['toggleSelector']),
  },
};
</script>

<style scoped>
  .tier-option {
    font-size: 12px;
  }
</style>