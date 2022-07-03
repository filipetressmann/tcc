<template>
  <div v-show="mapkey === 'main' || (secondMapIsActive && !hideSecondMapFlowsControl)">
    <div>
      <span v-if="secondMapIsActive" class="label">{{ $t("baseLayer") }} ({{ $t(`baseLayerMap.${mapkey}`) }}):</span>
      <span v-else class="label">{{ $t("baseLayer") }}:</span>
      <b-radio
        v-model="od"
        :name="mapkey"
        native-value="grid"
        type="is-info"
      >
        <span class="view-option">{{ $t("grid") }}</span>
      </b-radio>
      <b-radio
        v-model="od"
        :name="mapkey"
        native-value="zones"
        type="is-info"
      >
        <span class="view-option">{{ $t("zones") }}</span>
      </b-radio>
    </div>
    <div v-if="od == 'grid'">
      <div v-if="!gridEditMode">
        <Button
          :text="this.$t('buttons.gridEditMode')"
          :title="this.$t('onHover.gridEditMode')"
          :handle-click="() => setGridEditModeOn(mapkey)"
        />
      </div>
      <div v-if="gridEditMode">
        <GridForm :mapkey="mapkey" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';
import GridForm from '@/components/filters/forms/GridForm';
import Button from '@/components/buttons/Button.vue';

export default {
  components: {
    GridForm,
    Button,
  },
  props: {
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      od: 'grid',
    };
  },
  computed: {
    ...mapGetters({
      filterParams: 'filters',
    }),
    ...mapGetters(['secondMapIsActive']),
    ...mapGetters('flows', ['hideSecondMapFlowsControl']),
    ...mapState({
      gridEditMode(state) {
        return state.filters[this.mapkey].gridEditMode;
      },
    }),
  },
  watch: {
    od: function (value) {
      this.updateOD({ value, mapkey: this.mapkey });
      this.resetMapResource({
        mapkey: this.mapkey,
        category: 'flows',
        type: 'polyline',
      });
      this.resetFlows(this.mapkey);
      if (value == 'zones') {
        this.showZones(this.mapkey);
        this.hideGrid(this.mapkey);
      } else if (value == 'grid') {
        this.showGrid(this.mapkey);
        this.hideZones(this.mapkey);
      }
      this.filterData(this.mapkey);
    },
  },
  methods: {
    ...mapActions([
      'updateOD',
      'resetMapResource',
      'filterData',
      'setGridEditModeOn',
      'flows/resetFlows',
    ]),
    ...mapMutations(['showZones', 'hideZones', 'showGrid', 'hideGrid']),
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
    ...mapActions('flows', ['resetFlows']),
  },
};
</script>

<style scoped>
.label {
  font-size: 12px;
}
.view-option {
  font-size: 12px;
}

</style>
