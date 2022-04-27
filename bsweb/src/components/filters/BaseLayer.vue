<template>
  <div>
    <div>
      <span class="label">{{ $t('baseLayer') }}</span>
      <b-radio
        v-model="od"
        :name="mapkey"
        native-value="grid"
        type="is-info"
      >
        <span class="view-option">{{ $t('grid') }}</span>
      </b-radio>
      <b-radio
        v-model="od"
        :name="mapkey"
        native-value="zones"
        type="is-info"
      >
        <span class="view-option">{{ $t('zones') }}</span>
      </b-radio>
    </div>
    <div v-if="od == 'grid'">
      <div
        v-if="!gridEditMode"
        class="edit-grid-button"
        :title="this.$t('onHover.gridEditMode')"
        @click="setGridEditModeOn()"
      >
        <span>{{ $t('buttons.gridEditMode') }}</span>
      </div>
      <div v-if="gridEditMode">
        <GridForm />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import GridForm from '@/components/filters/forms/GridForm';

export default {
  components: {
    GridForm,
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
      gridEditMode: 'gridEditMode',
    }),
  },
  watch: {
    od: function(value) {
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
      'resetFlows',
    ]),
    ...mapMutations([
      'showZones',
      'hideZones',
      'showGrid',
      'hideGrid',
    ]),
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
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

  .edit-grid-button {
    cursor: pointer;
    border: 1px solid #167df0;
    border-radius: 5px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-size: 12px;
    color: #167df0;
  }
  .edit-grid-button:hover {
    color: #363636;
    background-color: #ddd;
  }
</style>