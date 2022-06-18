<template>
  <div class="wrapper">
    <p>Suba aqui seus arquivos de Shapefiles</p>
    <form @submit.prevent="submitFiles">
      <input
        id="files"
        type="file"
        multiple
        @change="onFileChange"
      >
      
      <b-radio
        v-model="type"
        name="upload-type"
        native-value="trips"
        type="is-info"
      >
        <span class="view-option">Viagens</span>
      </b-radio>
      <b-radio
        v-model="type"
        name="upload-type"
        native-value="layer"
        type="is-info"
      >
        <span class="view-option">Camada</span>
      </b-radio>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">Nome</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="name"
            type="text"
            class="input is-info"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">Espessura (px)</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="width"
            type="number"
            class="input is-info"
            min="0"
            step="0.1"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">Opacidade</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="opacity"
            type="number"
            class="input is-info"
            min="0"
            max="1"
            step="0.01"
          >
        </div>
      </div>

      <input type="submit">
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    // Layers,
    // CopyLayers,
  },
  data() {
    return {
      type: 'layer',
      name: '',
      width: 1,
      opacity: 0.9,
      files: null,
    };
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
  },
  methods: {
    ...mapActions([
      'toggleMirrorLayerControl',
      'setHideSecondMapLayerControl',
    ]),
    ...mapActions('user_shapefiles', [
      'shapefileToGeoJson',
    ]),
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.files = files;
    },
    submitFiles () {
      console.log('files :>> ', this.files);
      const formData = new FormData();
      formData.append('name', 'NomePena');

      // @@@ Validação
      const cpg = [...this.files].filter(n => /.+\.cpg$/.test(n.name))[0];
      const dbf = [...this.files].filter(n => /.+\.dbf$/.test(n.name))[0];
      const shp = [...this.files].filter(n => /.+\.shp$/.test(n.name))[0];
      const shx = [...this.files].filter(n => /.+\.shx$/.test(n.name))[0];

      const props = {
        style: {
          opacity: 0.8,
          color: '#ff0000',
          width: 2,
        },
        name: 'Nome da camada',
        // "id": "?",
      };

      formData.append('cpg', cpg);
      formData.append('dbf', dbf);
      formData.append('shp', shp);
      formData.append('shx', shx);
      this.shapefileToGeoJson({ formData, props });
    },
  },
};
</script>

<style scoped>
.label-wrapper {
  display: flex;
  justify-content: right;
}
.custom-label {
  font-size: 12px;
  width: fit-content;
  text-align: right !important;
}
input {
  /* width: 100px; */
  /* height: 14px; */
}

.field-label {
  text-align: right;
  width: 300px;
}
.view-option {
  font-size: 12px;
}
</style>