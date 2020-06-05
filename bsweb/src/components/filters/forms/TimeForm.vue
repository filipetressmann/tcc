<template>
  <div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="morning">
        Manhã (6h - 12h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="afternoon">
        Tarde (12h - 18h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="evening">
        Noite (18h - 00h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="specific">
        Horário específico
      </b-checkbox>
    </div>
    <div v-if="specific">
      <b-field label="De">
        <b-timepicker v-model="minTime" icon="clock" />
      </b-field>
      <b-field label="Até">
        <b-timepicker v-model="maxTime" icon="clock" />
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
        minTime: new Date(),
        maxTime: new Date()
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
