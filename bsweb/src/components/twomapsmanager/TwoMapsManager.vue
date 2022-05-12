<template>
  <div class="wrapper">
    <div class="content">
      <div class="field">
        <b-radio
          v-model="radio"
          native-value="main"
          type="is-info"
          name="twomaps"
          size="is-small"
        >
          <span class="label">Trabalhar no mapa principal</span>
        </b-radio>
      </div>
      <div class="field">
        <b-radio
          v-model="radio"
          native-value="second"
          type="is-info"
          name="twomaps"
          size="is-small"
        >
          <span class="label">Trabalhar no segundo mapa</span>
        </b-radio>
      </div>
      <div class="fieldasd">
        <b-radio
          v-model="radio"
          native-value="both"
          type="is-info"
          name="twomaps"
          size="is-small"
        >
          <span class="label">Trabalhar nos dois mapas</span>
        </b-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      radio: 'main',
    };
  },
  watch: {
    radio: function(value) {
      this.changeMapControl(value);
    },
  },
  methods: {
    ...mapActions([
      'changeMapControl',
    ]),
  },
};
</script>

<style scoped>
  .wrapper {
    z-index: 2000;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .content {
    margin: 10px;
  }

  .label {
    font-size: 12px;
    font-weight: normal;
  }
</style>