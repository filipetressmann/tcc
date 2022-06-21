<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      Mapa da esquerda
    </div>
    <Layers mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        Mapa da direita
      </div>
      <Layers mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox v-model="mirrorControl" :native-value="mirrorControl" type="is-info">
        <span>Espelhar alterações</span>
      </b-checkbox>
      <b-checkbox v-model="hideSecondMapControl" :native-value="hideSecondMapControl" type="is-info">
        <span>Ocultar controles da direita</span>
      </b-checkbox>
    </div>
    <CopyLayers />
    <UserLayers />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layers from '../filters/Layers.vue';
import UserLayers from '../filters/UserLayers.vue';
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