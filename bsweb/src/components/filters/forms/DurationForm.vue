<template>
  <div>
    <b-field>
      {{ $t('durationField') }}
      ({{ durationRange[0] }} {{ $t('to') }} {{ durationRange[1] }} {{ $t('minutes') }})
    </b-field>
    <b-slider
      v-model="durationRange"
      lazy
      :min="1"
      :max="180"
      :custom-formatter="value => `${value} min`"
      type="is-info"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    fid: { type: Number, required: true },
  },
  data() {
    return {
      durationRange: [1, 180],
    };
  },
  computed: {
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          durationRange: this.durationRange,
        },
      };
    },
  },
  watch: {
    setFilterParams: function(value) {
      this.updateFilterParams(value);
      this.resetMapResource({ mapkey: 'main', category: 'flows', type: 'polyline' });
      this.filterData();
    },
  },
  methods: {
    ...mapActions([
      'updateFilterParams',
      'resetMapResource',
      'filterData'
    ]),
  },
};
</script>