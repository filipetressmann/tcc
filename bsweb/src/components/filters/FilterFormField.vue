<template>
  <div>
    <age-form v-if="filter.filter_key == 'age'" :fid="filter.id" />
    <time-form v-if="filter.filter_key == 'horary'" :fid="filter.id" />
    <start-time-form v-if="filter.filter_key == 'start_time'" :fid="filter.id" />
    <finish-time-form v-if="filter.filter_key == 'finish_time'" :fid="filter.id" />
    <weekday-form v-if="filter.filter_key == 'weekday'" :fid="filter.id" />
    <month-form v-if="filter.filter_key == 'months'" :fid="filter.id" />
    <duration-form v-if="filter.filter_key == 'duration'" :fid="filter.id" />
    <sex-form v-if="filter.filter_key == 'sex'" :fid="filter.id" />
    <income-form v-if="filter.filter_key == 'income'" :fid="filter.id" />
    <distance-form v-if="filter.filter_key == 'distance'" :fid="filter.id" />
    <attractor-form v-if="filter.filter_key == 'attractors_emitters'" />
    <speed-form v-if="filter.filter_key == 'speed'" :fid="filter.id" />
    <reason-form v-if="filter.filter_key == 'reason'" :fid="filter.id" />
    <button type="button" @click="removeResource">Remover</button>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import AgeForm from './forms/AgeForm';
  import TimeForm from './forms/TimeForm';
  import StartTimeForm from './forms/StartTimeForm';
  import FinishTimeForm from './forms/FinishTimeForm';
  import WeekdayForm from './forms/WeekdayForm';
  import MonthForm from './forms/MonthForm';
  import DurationForm from './forms/DurationForm';
  import SexForm from './forms/SexForm';
  import IncomeForm from './forms/IncomeForm'
  import DistanceForm from './forms/DistanceForm'
  import AttractorForm from './forms/AttractorForm'
  import SpeedForm from './forms/SpeedForm'
  import ReasonForm from './forms/ReasonForm'
  
  export default {
    components: {
      AgeForm,
      TimeForm,
      StartTimeForm,
      FinishTimeForm,
      WeekdayForm,
      MonthForm,
      DurationForm,
      SexForm,
      IncomeForm,
      DistanceForm,
      AttractorForm,
      SpeedForm,
      ReasonForm
    },
    props: ['filter'],
    data() {
      return {
        filters: []
      };
    },
    methods: {
      ...mapActions(['removeFilter', 'removeActiveLayer', 'removeFromMap']),
      removeResource() {
        if (this.isLayer(this.filter)) {
          this.removeFromMap({ mapkey: "main", category: 'layers', type: this.filter.filter_type, key: this.filter.filter_key});
          this.removeActiveLayer({ ...this.filter, key: this.filter.filter_key });
        } else {
          this.removeFromMap({ mapkey: "main", category: 'flows', type: this.filter.filter_type, key: this.filter.filter_key});
          this.removeFilter(this.filter);
        }
      },
      isLayer(resource) {
        return [14, 15, 16, 18, 19, 20].includes(resource.id);
      }
    },
    computed: {
      activeFilters() {
          return this.$store.getters.activeFilters;
      }
    }
  }
</script>