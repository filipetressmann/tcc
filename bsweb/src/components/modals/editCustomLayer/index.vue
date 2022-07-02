<template>
  <Modal name="editCustomLayer">
    <div v-if="editLayerIndex !== null" class="modal-container">
      <h1 class="modal-title">
        {{ $t('editModal.title') }} {{ layer.name }}
      </h1>
      <form @submit.prevent="submit">
        <div class="columns">
          <div class="column label-wrapper">
            <label class="custom-label">{{ $t('editModal.inputs.name') }}</label>
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
            <label class="custom-label">{{ $t('editModal.inputs.width') }}</label>
          </div>
          <div class="column is-two-thirds is-flex is-align-items-center">
            <input
              v-model="weight"
              type="number"
              class="input is-info"
              min="0"
              step="0.1"
            >
          </div>
        </div>

        <div class="columns">
          <div class="column label-wrapper">
            <label class="custom-label">{{ $t('editModal.inputs.opacity') }}</label>
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

        <div class="columns">
          <div class="column label-wrapper">
            <label class="custom-label" title="Cor em hexadecimal">{{ $t('editModal.inputs.color') }}</label>
          </div>
          <div class="column is-two-thirds is-flex is-align-items-center">
            <input
              v-model="color"
              type="text"
              class="input is-info"
            >
          </div>
        </div>

        <div class="center">
          <button type="submit" class="custom-btn">
            {{ $t('editModal.button') }}
          </button>
        </div>
      </form>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../../Modal';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      name: '',
      color: '',
      opacity: '',
      weight: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters('modals', ['editLayerIndex']),
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
    layer() {
      return this.uploadedLayers[this.editLayerIndex];
    },
  },
  beforeMount() {
    this.name = this.layer.name;
    this.color = this.layer.style.color;
    this.opacity = this.layer.style.opacity;
    this.weight = this.layer.style.weight;
  },
  methods: {
    ...mapActions('user_shapefiles', ['editCustomLayer']),
    submit() {
      if (!this.validateFields()) return;
      const style = {
        color: this.color,
        opacity: this.opacity,
        weight: this.weight,
      };
      this.editCustomLayer({ index: this.editLayerIndex, name: this.name, style });
      this.close();
    },
    close() {
      this.$store.dispatch('modals/close', 'editCustomLayer');
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
  .modal-container {
    padding: 0 15%;
    height: 97%;
  }
  .modal-title {
    font-size: 36px;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 40px;
    text-align: center;
  }
  .error {
    margin: 20px 0;
    color: red;
    font-size: 12px;
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
</style>

