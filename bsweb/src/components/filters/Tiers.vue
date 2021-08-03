<template>
  <div>
    <p class="label">{{ $t('selectTiers') }}</p>
    <div v-show="!flowsNotFound" v-for="(count, index) in tierList" :key="index">
      <TierController
        :tier="index"
        :count="count"
      />
    </div>
    <span class="not-found" v-if="flowsNotFound">{{ $t('notFoundTiers') }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TierController from './TierController.vue';

  export default {
    components: {
      TierController
    },
    computed: {
      ...mapGetters([
        'tierList',
        'flowsNotFound',
      ]),
    },
    watch: {
      flowsNotFound: function (val) {
        if (val) {
          this.$toastr.warning(this.$t('toastr.emptyFlows'));
        }
      }
    },
    mounted() {
      // this.$toastr.info('Teste Toastr')
      // this.$toastr.success('Teste Toastr')
      // this.$toastr.warning('Teste Toastr')
      // this.$toastr.error('Teste Toastr')
      // this.$toastr.success('Message', 'Title', options);
      
    }
  }
</script>

<style scoped>
  .label {
    font-size: 12px;
  }
  .not-found {
    font-size: 12px;
  }
</style>