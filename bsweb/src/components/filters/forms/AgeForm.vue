<template>
  <div>
    <b-field>
      {{ $t('ageField') }}
      ({{ ageRange[0] }} {{ $t('to') }} {{ ageRange[1] }} {{ $t('years') }})
    </b-field>
    <b-slider
      v-model="ageRange"
      lazy
      :min="1"
      :max="71"
      :step="1"
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
      ageRange: [1, 71],
    };
  },
  computed: {
    ageLabel() {
      return `${$t(ageField)} ${this.ageRange[0]} - ${this.ageRange[1]}`;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          ageRange: this.ageRange,
        },
      };
    },
  },
  watch: {
    setFilterParams: function(value) {
      this.updateFilterParams(value);
    },
  },
  methods: {
    ...mapActions([
      'updateFilterParams',
    ]),
  },
};
</script>