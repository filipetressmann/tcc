<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      Mapa da esquerda
    </div>
    <Tiers v-show="!gridEditMode" mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        Mapa da direita
      </div>
      <Tiers v-show="!gridEditMode" mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox v-model="mirrorControl" :native-value="mirrorControl" type="is-info">
        <span>Espelhar alterações</span>
      </b-checkbox>
      <b-checkbox v-model="hideSecondMapControl" :native-value="hideSecondMapControl" type="is-info">
        <span>Ocultar controles da direita</span>
      </b-checkbox>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Tiers from '../filters/Tiers.vue';

export default {
  components: {
    Tiers,
  },
  computed: {
    ...mapGetters(['gridEditMode', 'secondMapIsActive']),
    mirrorControl: {
      get() {
        return this.$store.state.flows.mirrorControl;
      },
      set(value) {
        this.toggleMirrorFlowsControl();
      },
    },
    hideSecondMapControl: {
      get() {
        return this.$store.state.flows.hideSecondMapControl;
      },
      set(value) {
        this.sethideSecondMapFlowsControl(value);
      },
    },
  },
  methods: {
    ...mapActions('flows', [
      'toggleMirrorFlowsControl',
      'sethideSecondMapFlowsControl',
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