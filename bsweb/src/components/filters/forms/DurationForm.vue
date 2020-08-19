<template>
  <div>
    <b-field>
      {{ $t('durationField') }}
      ({{ durationRange[0]}} {{ $t('to') }} {{ durationRange[1] }} {{ $t('minutes') }})
    </b-field>
    <b-slider
      v-model="durationRange"
      lazy
      :min="1"
      :max="180"
      :custom-formatter="value => `${value} min`"
      type="is-info" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        durationRange: [1, 180]
      }
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            durationRange: this.durationRange
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
    }
  }
</script>