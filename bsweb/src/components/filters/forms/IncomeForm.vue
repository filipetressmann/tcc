<template>
  <div>
    <b-radio v-model="mode"
              name="mode"
              native-value="brackets"
              type="is-info">
      {{ $t('income_brackets') }}
    </b-radio>
    <b-radio v-model="mode"
              name="mode"
              native-value="interval"
              type="is-info">
        {{ $t('intervals') }}
    </b-radio>
    <b-slider
      v-model="incomeInterval"
      lazy
      :min="0"
      :max="42916"
      :step="1000"
      :custom-formatter="val => `R$ ${val}`"
      type="is-info"
      v-if="mode == 'interval'"/>
    <div v-if="mode == 'brackets'">
      <br>
      <b-checkbox v-model="incomeBracket"
          type="is-info"
          :native-value="1"
          @input="updateIncomeInterval">
          1 ({{ $t('max')}} R$ 1908)
      </b-checkbox>
      <b-checkbox v-model="incomeBracket"
          type="is-info"
          :native-value="2"
          @input="updateIncomeInterval">
          2 ({{ $t('from')}} R$ 1908 {{ $t('max')}} R$ 3816)
      </b-checkbox>
      <b-checkbox v-model="incomeBracket"
          type="is-info"
          :native-value="3"
          @input="updateIncomeInterval">
          3 ({{ $t('from')}} R$ 3816 {{ $t('max')}} R$ 7632)
      </b-checkbox>
      <b-checkbox v-model="incomeBracket"
          type="is-info"
          :native-value="4"
          @input="updateIncomeInterval">
          4 ({{ $t('from')}} R$ 7632 {{ $t('max')}} R$ 11448)
      </b-checkbox>
      <b-checkbox v-model="incomeBracket"
          type="is-info"
          :native-value="5"
          @input="updateIncomeInterval">
          5 ({{ $t('more_than') }} R$ 11488)
      </b-checkbox>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        incomeBracket: [],
        incomeInterval: [0, 0],
        // interval: false,
        mode: 'brackets',
        incomeBracketBounds: {
          1: {
            min: 0,
            max: 1908
          },
          2: {
            min: 1908,
            max: 3816
          },
          3: {
            min: 3816,
            max: 7632
          },
          4: {
            min: 7632,
            max: 11488
          },
          5: {
            min: 11448,
            max: 42916
          }
        }
      }
    },
    computed: {
      interval() {
        return this.mode === 'interval'
      },
      filterData() {
        return {
          id: this.fid,
          params: {
            incomeBracket: this.incomeBracket,
            incomeInterval: this.incomeInterval,
            interval: this.interval,
            mode: this.mode,
            incomeBracketBounds: this.incomeBracketBounds
          }
        }
      }
    },
    watch: {
      filterData: function(value) {
        this.updateFilterParams(value);
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams'
      ]),
      updateIncomeInterval(value) {
        let min_bracket = Math.min.apply(Math, value)
        let max_bracket = Math.max.apply(Math, value)
        let min_bounds = this.incomeBracketBounds[min_bracket]
        let max_bounds = this.incomeBracketBounds[max_bracket]
        this.incomeInterval[0] = min_bounds.min 
        this.incomeInterval[1] = max_bounds.max
      }
    }
  } 
</script>