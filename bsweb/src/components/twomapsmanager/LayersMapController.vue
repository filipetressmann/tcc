<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      Mapa da esquerda
    </div>
    <Layers mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapLayerControl">
      <hr>
      <div class="map-title">
        Mapa da direita
      </div>
      <Layers mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox v-model="mirrorLayerControl" :native-value="mirrorLayerControl" type="is-info">
        <span>Espelhar alterações</span>
      </b-checkbox>
      <b-checkbox v-model="hideSecondMapLayerControl" :native-value="hideSecondMapLayerControl" type="is-info">
        <span>Ocultar controles da direita</span>
      </b-checkbox>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layers from '../filters/Layers.vue';

export default {
  components: {
    Layers,
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
    mirrorLayerControl: {
      get() {
        return this.$store.state.map.mirrorLayerControl;
      },
      set(value) {
        this.toggleMirrorLayerControl();
      },
    },
    hideSecondMapLayerControl: {
      get() {
        return this.$store.state.layers.hideSecondMapLayerControl;
      },
      set(value) {
        this.sethideSecondMapLayerControl(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'toggleMirrorLayerControl',
      'sethideSecondMapLayerControl',
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