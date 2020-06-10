<template>
  <div>
    <age-form v-if="filter.filter_key == 'age'" :fid="filter.id" />
    <time-form v-if="filter.filter_key == 'horary'" :fid="filter.id" />
    <weekday-form v-if="filter.filter_key == 'weekday'" :fid="filter.id" />
  </div>
</template>
<script>
  import AgeForm from './forms/AgeForm';
  import TimeForm from './forms/TimeForm';
  import WeekdayForm from './forms/WeekdayForm';

  export default {
    components: {
      AgeForm,
      TimeForm,
      WeekdayForm
    },
    data() {
      return {
        filters: []
      };
    },
    props: ['filter'],
  }
</script>