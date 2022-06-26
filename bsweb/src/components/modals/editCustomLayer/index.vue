<template>
  <Modal name="editCustomLayer">
    <div v-if="editLayerIndex !== null" class="modal-container">
      <h1 class="modal-title">
        Editando camada {{ layer.name }}
      </h1>
      <form @submit.prevent="submit">
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

        <div class="columns">
          <div class="column label-wrapper">
            <label class="custom-label" title="Cor em hexadecimal">Cor</label>
          </div>
          <div class="column is-two-thirds is-flex is-align-items-center">
            <input
              v-model="color"
              type="text"
              class="input is-info"
            >
          </div>
        </div>

        <input type="submit">
      </form>
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

</style>

