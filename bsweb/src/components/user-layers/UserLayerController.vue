<template>
  <div style="display: flex; align-items: center; justify-content: space-between">
    <div>
      <input v-model="isActive" type="checkbox" :value="isActive">
      <label class="filter-name">{{ layerName }}</label>
    </div>
    <div>
      <div class="icon" title="Editar camada" @click="() => {}">
        <img :src="iconEdit" :class="['arrow', { active: isActive }]">
      </div>
      <div class="icon" title="Remover camada" @click="() => removeCustomLayer(index)">
        <img :src="iconDelete" :class="['arrow', { active: isActive }]">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import iconDelete from '@/assets/svg/delete.svg';
import iconEdit from '@/assets/svg/edit.svg';

export default {
  props: {
    layerName: { type: String, required: true },
    index: { type: Number, required: true },
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      iconDelete,
      iconEdit,
    };
  },
  computed: {
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
    isActive: {
      get() {
        return this.uploadedLayers[this.index].isActive[this.mapkey];
      },
      set(value) {
        this.toggleCustomLayer({ index: this.index, mapkey: this.mapkey, value });
      },
    },
  },
  methods: {
    ...mapActions('user_shapefiles', ['toggleCustomLayer', 'removeCustomLayer']),
  },
};
</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-size: 12px;
  }

  input {
    cursor: pointer;
  }

  .icon {
    width: 17px;
    cursor: pointer;
    margin: 0 10px;
  }
</style>