<template>
  <div>
    <div>
      <span class="label">{{ $t('baseLayer') }}</span>
      <b-radio v-model="od" name="Grid" native-value="grid" type="is-info">
        <span class="view-option">{{ $t('grid') }}</span>
      </b-radio>
      <b-radio v-model="od" name="Zonas OD" native-value="zones" type="is-info">
        <span class="view-option">{{ $t('zones') }}</span>
      </b-radio>
    </div>
    <div v-if="od == 'grid'">
      <div class="edit-grid-button" @click="setGridEditModeOn()" v-if="!gridEditMode">
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
      GridForm
    },
    data() {
      return {
        od: "grid",
      };
    },
    computed: {
      ...mapGetters({
        filterParams: 'filters',
        gridEditMode: 'gridEditMode',
      })
    },
    methods: {
      ...mapActions([
        'resetData',
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
        'hideGrid'
      ]),
      ...mapActions('loading', ['setLoading', 'unsetLoading']),
    },
    watch: {
      od: function(value) {
        this.updateOD(value);
        this.resetData();
        this.resetMapResource({
          mapkey: "main",
          category: "flows",
          type: "polyline"
        });
        this.resetFlows();
        if (value == "zones") {
          this.showZones("main");
          this.hideGrid("main");
        } else if (value == "grid") {
          this.showGrid("main");
          this.hideZones("main");
        }
        this.filterData();
      }
    }
  }
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