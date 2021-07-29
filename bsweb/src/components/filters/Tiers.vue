<template>
  <div>
    <p class="label">{{ $t('selectTiers') }}</p>
    <div v-show="tierList.length > 0" v-for="(count, index) in tierList" :key="index">
      <TierController
        :tier="index"
        :count="count"
      />
    </div>
    <span v-if="tierList.length === 0">{{ $t('notFoundTiers') }}</span>
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
      ]),
    },
    mounted() {
      this.$toastr.info('Teste Toastr')
      this.$toastr.success('Teste Toastr')
      this.$toastr.warning('Teste Toastr')
      this.$toastr.error('Teste Toastr')
      // this.$toastr.success('Message', 'Title', options);
      
    }
  }
</script>
