<template>
  <div>
    <div class="field">
      <b-checkbox v-model="morning" @input="specific = false">
        Manhã (6h - 12h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="afternoon" @input="specific = false">
        Tarde (12h - 18h)
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="evening" @input="specific = false">
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
    <br>
    <b-button type="is-info" @click="submitParams" expanded>
      Filtrar
    </b-button>
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
        morning: false,
        afternoon: false,
        evening: false,
        minTime: new Date(),
        maxTime: new Date()
      };
    },
    methods: {
      ...mapActions([
        'filterData'
      ]),
      submitParams() {
        const args = {
          fid: this.fid,
          morning: this.morning,
          afternoon: this.afternoon,
          evening: this.evening,
          minHour: -1,
          maxHour: -1
        }
        if (this.specific) {
          args.minHour = this.minTime.getHours();
          args.maxHour = this.maxTime.getHours();
        }
        this.filterData({
          httpResource: this.$http, 
          filter: args
        });
      }
    }
  }
</script>
