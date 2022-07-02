<template>
  <div>
    <p class="title-options">
      {{ $t('tabs.maps.title') }}
    </p>
    <b-field>
      <b-checkbox v-model="secondMapIsActive" type="is-info" size="is-small">
        <span class="view-option">{{ $t('tabs.maps.action') }}</span>
      </b-checkbox>
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['secondMapIsActive', 'centerMain', 'centerSecond']),
    secondMapIsActive: {
      get() {
        return this.$store.state.map.secondMapIsActive;
      },
      set() {
        this.toggleSecondMap();
      },
    },
  },
  methods: {
    ...mapActions(['toggleSecondMap']),
  },
};
</script>

<style scoped>
.title-options {
    font-size: 12px;
    font-weight: bold;
  }
  .view-option {
    font-size: 12px;
  }
</style>
