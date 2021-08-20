<template>
  <div>
    <b-radio
      v-model="mode"
      name="mode"
      native-value="brackets"
      type="is-info"
    >
      {{ $t('income_brackets') }}
    </b-radio>
    <b-radio
      v-model="mode"
      name="mode"
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
  },
  data() {
    return {
      incomeBracket: [], // array com checkboxes marcados
      incomeInterval: [0, 42916],
      mode: 'brackets',
      incomeBracketBounds: {
        1: {
          min: 0,
          max: 1908,
        },
        2: {
          min: 1908,
          max: 3816,
        },
        3: {
          min: 3816,
          max: 7632,
        },
        4: {
          min: 7632,
          max: 11488,
        },
        5: {
          min: 11448,
          max: 42916,
        },
      },
    };
  },
  computed: {
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
        this.removeActiveFilter(this.filter);
      } else {
        if (prevCount === 0) {
          this.addActiveFilter(this.filter);
        }
        this.updateFilterParams(this.setFilterParams);
      }
    },
    changedSlider: function() {
      this.updateFilterParams(this.setFilterParams);
    },
    interval: function() {
      this.updateFilterParams(this.setFilterParams);
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