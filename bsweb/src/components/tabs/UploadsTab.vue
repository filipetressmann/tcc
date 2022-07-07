<template>
  <div class="wrapper">
    <p>{{ $t('tabs.upload.title') }}</p>
    <p class="text">
      {{ $t('tabs.upload.text') }}:
      <ul>
        <li v-for="extension in $t('tabs.upload.extensions')" :key="extension">
          {{ extension }}
        </li>
      </ul>
    </p>
    <form @submit.prevent="submitFiles">
      <div class="file-btn-wrapper">
        <input
          id="files"
          type="file"
          multiple
          size="is-small"
          @change="onFileChange"
        >
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.name') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="name"
            type="text"
            class="input is-info is-small"
            size="is-small"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.width') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="weight"
            type="number"
            class="input is-info is-small"
            min="0"
            step="0.1"
            size="is-small"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.opacity') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="opacity"
            type="number"
            class="input is-info is-small"
            min="0"
            max="1"
            step="0.01"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label" title="Cor em hexadecimal">{{ $t('tabs.upload.inputs.color') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="color"
            type="text"
            class="input is-info is-small"
            size="is-small"
          >
        </div>
      </div>
      <div class="center">
        <button type="submit" class="custom-btn">
          {{ $t('tabs.upload.button') }}
        </button>
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      type: 'layer',
      name: '',
      weight: 1,
      opacity: 0.9,
      color: '',
      files: null,
      error: null,
      fileType: null,
    };
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
    mirrorControl: {
      get() {
        return this.$store.state.layers.mirrorControl;
      },
      set() {
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
      this.error = null;
      const files = e.target.files || e.dataTransfer.files;
      if (files && !files.length) {
        this.error = 'Você deve adicionar @@@';
        // this.error = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx';
        return;
      }
      this.files = files;
      this.validateFiles();
    },
    submitFiles () {
      this.error = null;
      const filesValidation = this.validateFiles();
      const fieldsValidation = this.validateFields();
      if (!filesValidation || !fieldsValidation) return;

      const formData = new FormData();

      if (this.fileType === 'shp') {
        const cpg = [...this.files].filter(n => /.+\.cpg$/.test(n.name))[0];
        const dbf = [...this.files].filter(n => /.+\.dbf$/.test(n.name))[0];
        const shp = [...this.files].filter(n => /.+\.shp$/.test(n.name))[0];
        const shx = [...this.files].filter(n => /.+\.shx$/.test(n.name))[0];
        formData.append('cpg', cpg);
        formData.append('dbf', dbf);
        formData.append('shp', shp);
        formData.append('shx', shx);
      } else if (this.fileType === 'kmz') {
        const kmz = this.files[0];
        formData.append('kmz', kmz);
      } else if (this.fileType === 'zip') {
        const zip = this.files[0];
        formData.append('zip', zip);
      }

      const props = {
        style: {
          opacity: this.opacity,
          color: this.color,
          weight: this.weight,
        },
        name: this.name,
      };

      this.shapefileToGeoJson({ formData, props, fileType: this.fileType });
    },
    validateFiles () {
      // Length validation
      if (!this.files || ![1, 4].includes(this.files.length)) {
        this.error = 'Você deve adicionar @@@';
        // this.error = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx.';
        this.files = null;
        return false;
      }

      if (this.files.length == 1) {
        if (!['.kmz', '.zip'].some(n => this.files[0].name.includes(n))) {
          this.error = 'Formato de arquivo inválido';
          this.files = null;
          return false;
        }
        if (this.files[0].name.includes('.kmz'))
          this.fileType = 'kmz';
        else this.fileType = 'zip';
      } else { // Shapefile (cpg, dbf, shp, shx)
        // File name validation
        const fileName = this.files[0].name.match('(.*)\\.')[1];
        [...this.files].forEach(file => {
          const name = file.name.match('(.*)\\.')[1];
          if (name !== fileName) {
            this.error = 'Os arquivos de um shapefile devem ter o mesmo nome.';
            this.files = null;
            return false;
          }
        });

        // Missing extension validation
        const extensions = ['.cpg', '.dbf', '.shp', '.shx'];
        for (const file of this.files) {
          const found = extensions.some(ext => file.name.includes(ext));
          if (!found) {
            this.error = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx.';
            this.files = null;
            return false;
          }
        }
        this.fileType = 'shp';
      }

      this.error = null;
      return true;
    },
    validateFields() {
      if (this.name.length === 0) {
        this.error = 'Nome é obrigatório.';
        return false;
      }
      if (this.weight.length === 0) {
        this.error = 'Espessura é obrigatória.';
        return false;
      }
      if (this.opacity.length === 0) {
        this.error = 'Opacidade é obrigatória.';
        return false;
      }
      if (this.color.length === 0) {
        this.error = 'Cor é obrigatória.';
        return false;
      }
      if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(this.color)) {
        this.error = 'Cor deve ser informada em hexadecimal, por exemplo #ffffff.';
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.label-wrapper {
  display: flex;
  justify-content: right;
  display: flex;
  align-items: center;
}
.custom-label {
  font-size: 12px;
  width: fit-content;
  text-align: right !important;
}

.field-label {
  text-align: right;
  width: 300px;
}
.view-option {
  font-size: 12px;
}
.file-btn-wrapper {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-btn {
  cursor: pointer;
  border: 1px solid #167df0;
  border-radius: 5px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0 5px;
  font-size: 12px;
  color: #167df0;
  height: 18px;
  background-color: #fff
}
.custom-btn:hover {
  color: #363636;
  background-color: #ddd;
}
.error {
  color: red;
  font-size: 12px;
}

p.text {
  font-size: 12px;
}

ul {
  list-style: disc;
  margin: 0 22px;
}
</style>