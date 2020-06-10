<template>
  <div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="morning" type="is-info">
        Manhã (6h - 12h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="afternoon"  type="is-info">
        Tarde (12h - 18h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="evening"  type="is-info">
        Noite (18h - 00h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="specific"  type="is-info">
        Horário específico
      </b-checkbox>
    </div>
    <div v-if="specific">
      <b-field label="De">
        <b-timepicker v-model="minTime" :increment-minutes="60" icon="clock" />
      </b-field>
      <b-field label="Até">
        <b-timepicker v-model="maxTime" :default-minutes="0" icon="clock" />
      </b-field>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  
  export default {
    props: ["fid"],
    data() {
      return {
        periods: [],
        specific: false,
        minTime: new Date(2020, 1, 1, 4, 0, 0),
        maxTime: new Date(2020, 1, 1, 13, 0, 0)
      };
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            periods: this.periods,
            specific: this.specific,
            minHours: this.minTime.getHours(),
            minMinutes: this.minTime.getMinutes(),
            maxHours: this.maxTime.getHours(),
            maxMinutes: this.maxTime.getMinutes()
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams'
      ])
    },
    watch: {
      filterData: function(value) {
        this.updateFilterParams(value);
      }
    }
  }
</script>
