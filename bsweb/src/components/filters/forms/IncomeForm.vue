<template>
  <div>
    <b-radio
      v-model="mode"
      :name="`income-radio-${mapkey}`"
      native-value="brackets"
      type="is-info"
    >
      {{ $t('income_brackets') }}
    </b-radio>
    <b-radio
      v-model="mode"
      :name="`income-radio-${mapkey}`"
      native-value="interval"
      type="is-info"
    >
      {{ $t('intervals') }}
    </b-radio>
    <b-slider
      v-if="mode == 'interval'"
      v-model="incomeInterval"
      lazy
      :min="0"
      :max="42916"
      :step="1000"
      :custom-formatter="val => `R$ ${val}`"
      type="is-info"
    />
    <div v-if="mode == 'brackets'">
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="1"
        >
        <label>1 ({{ $t('max') }} R$ 1908)</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="2"
        >
        <label>2 ({{ $t('from') }} R$ 1908 {{ $t('max') }} R$ 3816)</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="3"
        >
        <label>3 ({{ $t('from') }} R$ 3816 {{ $t('max') }} R$ 7632)</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="4"
        >
        <label>4 ({{ $t('from') }} R$ 7632 {{ $t('max') }} R$ 11448)</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="5"
        >
        <label>5 ({{ $t('more_than') }} R$ 11488)</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    fid: { type: Number, required: true },
    filter: { type: Object, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['selectors']),
    incomeBracket: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeBracket;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeBracket = value;
      },
    },
    incomeInterval: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeInterval;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeInterval = value;
      },
    },
    mode: {
      get() {
        return this.selectors[this.mapkey][this.fid].mode;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].mode = value;
      },
    },
    incomeBracketBounds: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeBracketBounds;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeBracketBounds = value;
      },
    },


    interval() {
      return this.mode === 'interval';
    },
    checkCount() {
      return this.incomeBracket.length;
    },
    changedSlider() {
      return this.incomeInterval;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          incomeBracket: this.incomeBracket,
          incomeInterval: this.incomeInterval,
          interval: this.interval,
          mode: this.mode,
          incomeBracketBounds: this.incomeBracketBounds,
        },
      };
    },
  },
  watch: {
    checkCount: function(count, prevCount) {
      if (count === 0) {
        this.removeActiveFilter({ filter: this.filter, mapkey: this.mapkey });
      } else {
        if (prevCount === 0) {
          this.addActiveFilter({ filter: this.filter, mapkey: this.mapkey });
        }
        this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
      }
    },
    changedSlider: function() {
      this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
    },
    interval: function() {
      this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
    },
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'updateFilterParams',
    ]),
  },
}; 
</script>

<style scoped>
  label {
    margin: 0 5px;
  }

  input {
    cursor: pointer;
  }
</style>