<template>
  <Modal name="editCustomLayer">
    <div class="about-container">
      <h1 class="bsw">
        Editando camada {{ editLayerIndex }}
      </h1>
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
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters('modals', ['editLayerIndex']),
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
  },
};
</script>

<style scoped>
  .about-container {
    padding: 0 15%;
    height: 97%;
    overflow: scroll;
  }
  .bsw {
    font-size: 36px;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 40px;
    text-align: center;
  }
  .about-selector {
    display: flex;
    justify-content: center;
  }
  .about-content {
    margin: 40px 0;
  }

  @media only screen and (max-width: 768px) {
  .about-selector {
    flex-direction: column;
  }
}
</style>

