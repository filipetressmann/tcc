<template>
  <div>
    <p>Opções para múltiplos mapas</p>
    <b-field>
      <b-checkbox v-model="secondMapIsActive">
        <span class="view-option">Ativar mapa adicional</span>
      </b-checkbox>
    </b-field>
    <p>centarMain: {{ centerMain }}</p>
    <p>centarSecond: {{ centerSecond }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    // LayerCategory,
  },
  data() {
    return {
      // twoMaps: false,
    };
  },
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
</style>
