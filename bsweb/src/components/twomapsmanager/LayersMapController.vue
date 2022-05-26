<template>
  <div class="wrapper">
    <b-checkbox v-model="mirrorLayerControl" :native-value="mirrorLayerControl" type="is-info">
      <span>Espelhar alterações</span>
    </b-checkbox>
    <b-checkbox v-model="hideAdditionalLayerControl" :native-value="hideAdditionalLayerControl" type="is-info">
      <span>Ocultar controles da direita</span>
    </b-checkbox>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    mirrorLayerControl: {
      get() {
        return this.$store.state.map.mirrorLayerControl;
      },
      set(value) {
        this.toggleMirrorLayerControl();
      },
    },
    hideAdditionalLayerControl: {
      get() {
        return this.$store.state.map.hideAdditionalLayerControl;
      },
      set(value) {
        this.toggleAdditionalLayerControl();
      },
    },
  },
  methods: {
    ...mapActions([
      'toggleMirrorLayerControl',
      'toggleAdditionalLayerControl',
    ]),
  },
};
</script>

<style scoped>
</style>