<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      {{ $t('twoMaps.leftMap') }}
    </div>
    <Layers mapkey="main" />
    <UserLayers mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        {{ $t('twoMaps.rightMap') }}
      </div>
      <Layers mapkey="second" />
      <UserLayers mapkey="second" />
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
    <CopyLayers />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layers from '../filters/Layers.vue';
import UserLayers from '@/components/user-layers/UserLayers.vue';
import CopyLayers from '@/components/buttons/copy-settings/CopyLayers.vue';

export default {
  components: {
    Layers,
    CopyLayers,
    UserLayers,
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
    mirrorControl: {
      get() {
        return this.$store.state.layers.mirrorControl;
      },
      set(value) {
        this.toggleMirrorLayerControl();
      },
    },
    hideSecondMapControl: {
      get() {
        return this.$store.state.layers.hideSecondMapControl;
      },
      set(value) {
        this.setHideSecondMapLayerControl(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'toggleMirrorLayerControl',
      'setHideSecondMapLayerControl',
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