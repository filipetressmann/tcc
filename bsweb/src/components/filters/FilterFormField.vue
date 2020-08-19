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
  </div>
</template>
<script>
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
    data() {
      return {
        filters: []
      };
    },
    props: ['filter'],
  }
</script>