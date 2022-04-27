<template>
  <div>
    <p class="label">
      {{ $t('selectTiers') }}
    </p>
    <div v-for="(count, index) in tierList" v-show="!flowsNotFound" :key="index">
      <TierController
        :tier="index"
        :count="count"
        :mapkey="mapkey"
      />
    </div>
    <span v-if="flowsNotFound" class="not-found">{{ $t('notFoundTiers') }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TierController from './TierController.vue';

export default {
  components: {
    TierController,
  },
  props: {
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters([
      // 'tripsPerTier',
      'flowsNotFound',
    ]),
    tierList() {
      // if (this.mapkey === 'second') debugger;
      return this.$store.state.filters[this.mapkey].tripsPerTier;
    },
  },
  watch: {
    flowsNotFound: function (val) {
      if (val) {
        this.$toastr.warning(this.$t('toastr.emptyFlows'));
      } else {
        this.$toastr.remove();
      }
    },
  },
};
</script>

<style scoped>
  .label {
    font-size: 12px;
  }
  .not-found {
    font-size: 12px;
  }
</style>