<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        text="Copiar filtros selecionados"
        title="Copiar filtros entre os mapas"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        text="Da esquerda para a direita"
        title="Copiar filtros selecionados do mapa da esquerda para o da direita"
        :handle-click="() => copyTo('second')"
      />
      <Button
        text="Da direita para a esquerda"
        title="Copiar filtros selecionadas do mapa da direita para o da esquerda"
        :handle-click="() => copyTo('main')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/buttons/Button.vue';

export default {
  components: {
    Button,
  },
  data() {
    return {
      copying: false,
    };
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
  },
  methods: {
    ...mapActions(['copySelectedFiltersTo']),
    copyTo(mapkey) {
      this.copySelectedFiltersTo(mapkey);
      this.copying = false;
    },
    activate() {
      this.copying = true;
    },
  },
};
</script>

<style scoped>
</style>