<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      {{ $t('twoMaps.leftMap') }}
    </div>
    <Filters mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        {{ $t('twoMaps.rightMap') }}
      </div>
      <Filters mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox
        v-model="mirrorControl"
        :native-value="mirrorControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('twoMaps.mirroredChanges') }}</span>
      </b-checkbox>
      <b-checkbox
        v-model="hideSecondMapControl"
        :native-value="hideSecondMapControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('twoMaps.hideRightControls') }}</span>
      </b-checkbox>
    </div>
    <CopyFilters />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Filters from '../filters/Filters.vue';
import CopyFilters from '@/components/buttons/copy-settings/CopyFilters.vue';

export default {
  components: {
    Filters,
    CopyFilters,
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
    mirrorControl: {
      get() {
        return this.$store.state.filters.mirrorControl;
      },
      set(value) {
        this.toggleMirrorFilterControl();
      },
    },
    hideSecondMapControl: {
      get() {
        return this.$store.state.filters.hideSecondMapControl;
      },
      set(value) {
        this.setHideSecondMapFilterControl(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'toggleMirrorFilterControl',
      'setHideSecondMapFilterControl',
    ]),
  },
};
</script>

<style scoped>
.map-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.options {
  margin: 20px;
}
.options span {
    font-size: 12px;
  }
</style>