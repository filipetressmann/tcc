<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        text="Copiar fluxos selecionados"
        title="Copiar fluxos entre os mapas"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        text="Da esquerda para a direita"
        title="Copiar fluxos selecionados do mapa da esquerda para o da direita"
        :handle-click="() => copyTo('second')"
      />
      <Button
        text="Da direita para a esquerda"
        title="Copiar fluxos selecionados do mapa da direita para o da esquerda"
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
  methods: {
    ...mapActions('flows', ['copyFlowsTo']),
    copyTo(mapkey) {
      this.copyFlowsTo(mapkey);
      this.copying = false;
    },
    activate() {
      this.copying = true;
    },
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
  },
};
</script>

<style scoped>

</style>