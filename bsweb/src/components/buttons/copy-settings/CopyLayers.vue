<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        text="Copiar camadas selecionadas"
        title="Copiar camadas entre os mapas"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        text="Da esquerda para a direita"
        title="Copiar camadas selecionadas do mapa da esquerda para o da direita"
        :handle-click="() => copyTo('second')"
      />
      <Button
        text="Da direita para a esquerda"
        title="Copiar camadas selecionadas do mapa da direita para o da esquerda"
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
    ...mapActions(['copySelectedLayersTo']),
    copyTo(mapkey) {
      this.copySelectedLayersTo(mapkey);
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