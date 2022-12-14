<template>
  <div v-show="mapkey === 'main' || secondMapIsActive">
    <div>
      <span v-if="secondMapIsActive" class="label">Origem dos dados das viagens ({{ $t(`baseLayerMap.${mapkey}`) }}):</span>
      <span v-else class="label">Origem dos dados das viagens:</span>
      <b-radio
        v-model="year"
        :name="`od-year-${mapkey}`"
        :native-value="2017"
        type="is-info"
      >
        <span class="view-option">OD 2017</span>
      </b-radio>
      <b-radio
        v-model="year"
        :name="`od-year-${mapkey}`"
        :native-value="2007"
        type="is-info"
      >
        <span class="view-option">OD 2007</span>
      </b-radio>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
  },
  props: {
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters('flows', ['odYear']),
    ...mapGetters(['secondMapIsActive']),
    year: {
      get() {
        return this.odYear[this.mapkey];
      },
      set(value) {
        this.setOdYear({ year: value, mapkey: this.mapkey });
      },
    },
  },
  watch: {
    year: function () {
      this.resetMapResource({
        mapkey: this.mapkey,
        category: 'flows',
        type: 'polyline',
      });
      this.resetFlows(this.mapkey);
      this.filterData(this.mapkey);
    },
  },
  methods: {
    ...mapActions('flows', ['setOdYear', 'resetFlows']),
    ...mapActions([
      'resetMapResource',
      'filterData',
    ]),
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
